<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;


class Incidents extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'pin_number',
        'client_name',
        'incident_type',
        'description',
        'image',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
