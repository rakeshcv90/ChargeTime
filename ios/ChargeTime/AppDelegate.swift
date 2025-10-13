import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore       // ✅ Add this
import FirebaseMessaging  // ✅ Add if you plan to use FCM
import UserNotifications  // ✅ Add if using notifications
@main
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate, MessagingDelegate {
  var window: UIWindow?
  
  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?
  
  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    
    // ✅ If using push notifications
    UNUserNotificationCenter.current().delegate = self
    application.registerForRemoteNotifications()
    Messaging.messaging().delegate = self
    
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()
    
    reactNativeDelegate = delegate
    reactNativeFactory = factory
    
    window = UIWindow(frame: UIScreen.main.bounds)
    
    factory.startReactNative(
      withModuleName: "ChargeTime",
      in: window,
      launchOptions: launchOptions
    )
    
    return true
  }
  // ✅ Get FCM Token
   func messaging(_ messaging: Messaging, didReceiveRegistrationToken fcmToken: String?) {
     print("📲 FCM Token123: \(fcmToken ?? "")")
   }

   // ✅ Handle notification while app in foreground
   func userNotificationCenter(_ center: UNUserNotificationCenter,
                               willPresent notification: UNNotification,
                               withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
     completionHandler([.banner, .sound, .badge])
   }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
