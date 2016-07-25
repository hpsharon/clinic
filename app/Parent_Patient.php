<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parent_Patient extends Model
{
    protected $fillable = ['name', 'email', 'phone'];
    protected $table = "parents";
    protected $hidden = ["created_at", "deleted_at", "updated_at"];

    public function Patient()
    {
        return $this->belongsTo("App\Patient");
    }
}
