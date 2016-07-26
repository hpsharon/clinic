<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeetingTherapistPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meeting_therapist', function (Blueprint $table) {
            $table->integer('meeting_id')->unsigned()->index();
            $table->foreign('meeting_id')->references('id')->on('meetings')->onDelete('cascade');
            $table->integer('therapist_id')->unsigned()->index();
            $table->foreign('therapist_id')->references('id')->on('users')->onDelete('cascade');
            $table->primary(['meeting_id', 'therapist_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('meeting_therapist');
    }
}
