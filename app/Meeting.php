<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    //
    protected $dates = ['start_time', 'end_time'];
    protected $fillable = ['start_time', 'end_time', 'goals','tools', 'description','remarks' ];
    protected $hidden = ['created_at', 'organization_id', 'updated_at'];
    protected $appends = ['patients'];

    public function Organization()
    {
        return $this->belongsTo("App\Organization");
    }

    public function Patients()
    {
        $table = "meeting_patient";
        $foreignKey = "meeting_id";
        $query = $this->belongsToMany("App\Patient", $table, $foreignKey)->getQuery()->toSql();
        return $this->belongsToMany("App\Patient", $table, $foreignKey);
    }

    public function getPatientsAttribute()
    {
        return $this->attributes['patients'] = $this->Patients()->get();
    }

}
