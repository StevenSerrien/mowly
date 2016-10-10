<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
    use SoftDeletes;
    protected $fillable = ['name', 'streetname', 'housenumber', 'city', 'country', 'latitude', 'longitude'];
    protected $dates = ['deleted_at'];
}
