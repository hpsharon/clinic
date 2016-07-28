<?php

namespace App\Http\Controllers;

use App\Parent_Patient;
use Illuminate\Http\Request;

use App\Http\Requests;

class ParentController extends Controller
{
    public static function createNewParent($parentDetails)
    {
        $parent = new Parent_Patient($parentDetails);
        return $parent;
    }

    public static function updateParent($parentId, $parentDetails)
    {
        $parent = Parent_Patient::find($parentId);
        foreach($parentDetails as $key => $value) {
            $parent[$key] = $value;
        }
        $parent->save();
        return $parent;
    }
}
