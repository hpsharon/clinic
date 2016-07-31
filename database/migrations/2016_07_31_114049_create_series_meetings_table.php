<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeriesMeetingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series_meetings', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamps();
            $table->integer("num_of_meetings");
            $table->string("summary");
            $table->integer("patient_id")->unsigned()->nullable();
            $table->foreign('patient_id')->references('id')->on('patients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('series_meetings');
    }
}
