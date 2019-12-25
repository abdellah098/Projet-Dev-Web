<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cours', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string("titre");
            $table->text("description");
            $table->string("niveau");
            $table->integer("duree");
            $table->string("document");
            $table->string("categorie");
            $table->string("difficulte");
            $table->text("objectif");
            $table->string("prerequis");
            $table->timestamps();

            $table->integer("professeur_id")->unique();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cours');
    }
}
