<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SeriesMeetingAddTo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meetings', function($table)
        {
            $table->integer("series_meeting_id")->unsigned()->nullable();
            $table->foreign("series_meeting_id")->references('id')->on('series_meetings');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('meetings', function($table)
        {
            $table->dropColumn("series_meeting_id");
        });
    }
}
