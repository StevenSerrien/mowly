<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Place extends Model
{
  use SoftDeletes;
  protected $fillable = ['name', 'streetname', 'housenumber', 'city', 'country', 'latitude', 'longitude'];
  protected $dates = ['deleted_at'];


  public function drinks()
  {
    return $this->hasMany('App\Drink');
  }

  public function foods()
  {
    return $this->hasMany('App\Food');
  }

  //calculate distance from user to place
  public function ScopeDistance($query,$from_latitude,$from_longitude,$distance)
  {
    // This will calculate the distance in m
    // if you want in miles use 3959 instead of 6371
    // 6371000 = meter, 6371 = km
    $raw = \DB::raw('ROUND ( ( 6371000 * acos( cos( radians('.$from_latitude.') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('.$from_longitude.') ) + sin( radians('.$from_latitude.') ) * sin( radians( latitude ) ) ) ) ) AS distanceInMeters');
    return $query->select('*')->addSelect($raw)->orderBy( 'distanceInMeters', 'ASC' )->groupBy('distanceInMeters')->having('distanceInMeters', '<=', $distance);
  }
}
