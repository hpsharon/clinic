<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Role;
use App\Organization;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('dashboard');
    }

    public function getLoggedInUser()
    {
        if (Auth::check())
        {
            $user = Auth::user();
            $arr = $user->toArray();
        } else {
            $arr = "";
        }
        return $arr;
    }

    public function getOrgById(Request $request) {
        $orgId = $request->input("id");
        $org = Organization::find($orgId);
        return $org->toArray();
    }

}
