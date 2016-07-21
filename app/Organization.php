<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
    protected $fillable = ['name', 'address', 'phone'];
    protected $hidden = ['created_at', 'updated_at'];

    public function users()
    {
        return $this->hasMany("App\User");
    }

}
