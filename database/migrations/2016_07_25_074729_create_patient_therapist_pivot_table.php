<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientTherapistPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patient_therapist', function (Blueprint $table) {
            $table->integer('patient_id')->unsigned()->index();
            $table->foreign('patient_id')->references('id')->on('patients')->onDelete('cascade');
            $table->integer('therapist_id')->unsigned()->index();
            $table->foreign('therapist_id')->references('id')->on('users')->onDelete('cascade');
            $table->primary(['patient_id', 'therapist_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('patient_therapist');
    }
}
