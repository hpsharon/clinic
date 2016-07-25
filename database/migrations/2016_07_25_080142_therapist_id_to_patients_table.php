<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TherapistIdToPatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('patients', function($table)
        {
            $table->integer('therapist_id')->unsigned()->nullable();
        });

        Schema::table('patients', function($table)
        {
            $table->foreign('therapist_id')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('patients', function($table)
        {
            $table->dropColumn("therapist_id");
        });
    }
}
