<?php namespace App;

use Zizaco\Entrust\EntrustRole;

class Role extends EntrustRole
{
    protected $hidden = ['created_at', 'description', 'pivot', 'updated_at'];
}