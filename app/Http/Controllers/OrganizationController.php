<?php

namespace App\Http\Controllers;

use App\Organization;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;
use Mockery\CountValidator\Exception;

class OrganizationController extends Controller
{
    /**
     * @param Request $request: contains array called 'organization' with the org details
     * @return array|string
     */
    public static function createNewOrganization(Request $request)
    {
        OrganizationController::checkPermissionsForCreatingNewOrg();
        $organization = $request->input("organization");
        $org = new Organization($organization);
        $org->save();
        return $org;
    }

    public static function getOrgById($orgId)
    {
        return Organization::find($orgId);
    }

    /**
     * @param $orgId The organization id to update
     * @param $arr_valuesToUpdate key-value array with the params to update org
     * @return mixed
     */
    public static function updateOrganization($orgId, $arr_valuesToUpdate)
    {
        OrganizationController::checkPermissionForUpdateOrg();
        $org = Organization::find($orgId);
        foreach($arr_valuesToUpdate as $key => $value) {
            $org[$key] = $value;
        }
        $org->save();
        return $org;
    }

    /**
     * Returns all orgs that in the system
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public static function getAllOrgs()
    {
        OrganizationController::checkPermissionsForGettingAllOrgs();
        return Organization::all();
    }

    /**
     * @param $orgId the organization id to delete
     * @return bool
     */
    public static function deleteOrg($orgId)
    {
        Organization::destroy($orgId);
        return true;
    }

    public static function getAllUsersForOrg($orgId)
    {
        $org = Organization::findOrFail($orgId);
        $users = $org->users()->get();
        $orgPatients = $org->patients()->get();
        return $users->merge($orgPatients);

    }

    private static function checkPermissionsForCreatingNewOrg()
    {
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "המשתמש המחובר אינו יכול ליצור ארגונים חדשים");
        }
    }

    private static function checkPermissionForUpdateOrg()
    {
        //TODO:: the user can update the org if it is the org admin
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "המשתמש המחובר אינו יכול לעדכן ארגונים");
        }
    }

    protected static function checkPermissionsForGettingAllOrgs()
    {
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "שגיאה");
        }
    }
}
