<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends User
{
    protected $table = 'users';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->save();
        $this->attachRole(5);
    }

    public function roles()
    {
        $table = "role_user";
        $foreignKey = "user_id";
        return $this->belongsToMany('App\Role', $table, $foreignKey);
    }
    
}
