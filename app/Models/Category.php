<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_type',
        'description',
        // Add image if it's being uploaded
        // Add any other fields you are handling in the form
    ];
}
