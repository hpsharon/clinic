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
    public function createNewOrganization(Request $request)
    {
        $this->checkPermissionsForCreatingNewOrg();
        $organization = $request->input("organization");
        $org = new Organization($organization);
        $org->save();
        return $org;
    }

    /**
     * @param $orgId The organization id to update
     * @param $arr_valuesToUpdate key-value array with the params to update org
     * @return mixed
     */
    public function updateOrganization($orgId, $arr_valuesToUpdate)
    {
        $this->checkPermissionForUpdateOrg();
        $org = Organization::find($orgId);
        foreach($arr_valuesToUpdate as $key => $value) {
            $org[$key] = $value;
        }
        $org->save();
        return $org;
    }

    public function getAllOrgs()
    {
        $this->checkPermissionsForGettingAllOrgs();
        return Organization::all();
    }

    public function deleteOrg($orgId)
    {
        Organization::destroy($orgId);
        return true;
    }

    private function checkPermissionsForCreatingNewOrg()
    {
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "המשתמש המחובר אינו יכול ליצור ארגונים חדשים");
        }
    }

    private function checkPermissionForUpdateOrg()
    {
        //TODO:: the user can update the org if it is the org admin
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "המשתמש המחובר אינו יכול לעדכן ארגונים");
        }
    }

    protected function checkPermissionsForGettingAllOrgs()
    {
        $loggedInUser = Auth::user();
        if ($loggedInUser->hasRole('SYSTEM_ADMIN')){
            return true;
        } else {
            abort(401, "שגיאה");
        }
    }
}
