<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Organization extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'address', 'phone'];
    protected $hidden = ['created_at', 'updated_at'];

    public function users()
    {
        return $this->hasMany("App\User");
    }

    public function patients()
    {
        return $this->hasMany("App\Patient");
    }

}
