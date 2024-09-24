<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incidents extends Model
{
    use HasFactory;

    protected $fillable = [
        'pin_number',
        'client_name',
        'incident_type',
        'description',
        'image', // Add image if it's being uploaded
        // Add any other fields you are handling in the form
    ];
}
