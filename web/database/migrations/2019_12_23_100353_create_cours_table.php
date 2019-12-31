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
            $table->string("niveau")->nullable();
            $table->integer("duree")->nullable();
            $table->string("document");
            $table->string("categorie")->nullable();
            $table->string("difficulte")->nullable();
            $table->text("objectif")->nullable();
            $table->string("prerequis")->nullable();
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
