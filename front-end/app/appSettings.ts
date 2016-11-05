export class AppSettings {
   public static get API_ENDPOINT(): string {
     return 'http://localhost:8888/api';
     //return 'http://mowly-backend.dev/api'
   }
    public static get BASE_URL(): string {
        return 'http://localhost:3000';
        //return 'http://mowly.be'
    }
    public static get GOOGLE_API_KEY(): string {
        return 'AIzaSyC6szXLklZiZ5VxJHSd6vxBJHVMuzqWW2o';
    }
}
