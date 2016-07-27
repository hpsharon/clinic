<?php

namespace App\Http\Controllers;

use App\Organization;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class UserController extends Controller
{
    public static function createUserForOrgId($arr_userDetails, $orgId, $roleId)
    {
        $arr_userDetails["password"] = bcrypt($arr_userDetails["password"]);
        $user = new User($arr_userDetails);
        $user->Organization()->associate(Organization::findOrFail($orgId));
        $user->save();
        $user->attachRole($roleId);
        return $user;
    }
}
