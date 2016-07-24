<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Therapist extends User
{
    protected $table = 'users';

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->save();
        $this->attachRole(3);

    }

    public function roles()
    {
        return $this->belongsToMany('App\Role', "role_user", "user_id");
    }

}
