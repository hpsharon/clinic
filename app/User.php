<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use App\Role;

class User extends Authenticatable
{
    use EntrustUserTrait;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'email', 'password'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['password', 'remember_token', 'created_at', 'updated_at', 'organization_id'];

    protected $appends = ['roles', 'organization'];

    public function roles()
    {
        return $this->belongsToMany('App\Role');
    }

    public function organization()
    {
        return $this->belongsTo("App\Organization");
    }


    public function getRolesAttribute()
    {
        return $this->attributes['roles'] = $this->roles()->get();
    }

    public function getOrganizationAttribute()
    {
        return $this->attributes['organization'] = $this->Organization()->get();
    }
    
}
