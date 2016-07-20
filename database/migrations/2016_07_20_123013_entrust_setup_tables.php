<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class EntrustSetupTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        // Create table for storing roles
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Create table for associating roles to users (Many-to-Many)
        Schema::create('role_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('user_id')->references('id')->on('users')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['user_id', 'role_id']);
        });

        // Create table for storing permissions
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        // Create table for associating permissions to roles (Many-to-Many)
        Schema::create('permission_role', function (Blueprint $table) {
            $table->integer('permission_id')->unsigned();
            $table->integer('role_id')->unsigned();

            $table->foreign('permission_id')->references('id')->on('permissions')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['permission_id', 'role_id']);
        });

//        INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
//        (1, 'SYSTEM_ADMIN', 'System Administrator', 'System Administrator', '2016-07-20 09:35:08', '2016-07-20 09:35:08'),
//        (2, 'ORG_ADMIN', 'Organization Administrator', 'Organization Administrator', '2016-07-20 09:35:34', '2016-07-20 09:35:34'),
//        (3, 'THERAPIST', 'Therapist', 'Therapist', '2016-07-20 10:51:23', '2016-07-20 10:51:23'),
//        (4, 'SOLO_THERAPIST', 'Solo Therapist', 'Solo Therapist', '2016-07-20 10:51:23', '2016-07-20 10:51:23'),
//        (5, 'PATIENT', 'Patient', 'Patient', '2016-07-20 10:51:24', '2016-07-20 10:51:24'),
//        (6, 'PARENT', 'Parent', 'Parent', '2016-07-20 10:51:24', '2016-07-20 10:51:24');
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_user');
        Schema::drop('roles');
    }
}
