export class AppSettings {
   public static get API_ENDPOINT(): string {

       //return 'http://api.mowly.be/api';
     //return 'http://mowly-backend.dev/api'
       return 'http://localhost:8888/api';
   }
    public static get BASE_URL(): string {

        // return 'http://mowly.be';
        return 'http://localhost:3000';
    }
    //mowly google API key for maps
    public static get GOOGLE_API_KEY(): string {
        return 'AIzaSyC6szXLklZiZ5VxJHSd6vxBJHVMuzqWW2o';
    }

}
