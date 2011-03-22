//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"production";
NSString * const TI_APPLICATION_ID = @"com.mickschroeder.rxshortages";
NSString * const TI_APPLICATION_PUBLISHER = @"Michael Schroeder";
NSString * const TI_APPLICATION_URL = @"http://mickschroeder.com/rxshortages";
NSString * const TI_APPLICATION_NAME = @"RxShortages";
NSString * const TI_APPLICATION_VERSION = @"2.0";
NSString * const TI_APPLICATION_DESCRIPTION = @"Rx Shortages is designed to help health care providers access information about drug shortages quickly and easily.";
NSString * const TI_APPLICATION_COPYRIGHT = @"2011 Michael Schroeder";
NSString * const TI_APPLICATION_GUID = @"28712af0-8441-4d6f-bdaa-6c3576934ec2";
BOOL const TI_APPLICATION_ANALYTICS = false;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
