import ExpoModulesCore
import MyIdSDK

struct MyIdProps : Record {
    @Field
    var clientId: String = ""

    @Field
    var clientHashId: String = ""

    @Field
    var clientHash: String = ""

    @Field
    var mode: String = "DEBUG"

    @Field
    var locale: String = "ru"
}

public class ExpoMyidModule: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ExpoMyid')` in JavaScript.
        Name("ExpoMyid")
        
        // Defines event names that the module can send to JavaScript.
        Events("onMyid")
        
        // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
        AsyncFunction("myid_login") { (data: MyIdProps) in
            DispatchQueue.main.async {
                let client_id = data.clientId;
                let clientHashId = data.clientHashId;
                let clientHash = data.clientHash;
                
                var buildMode = MyIdBuildMode.DEBUG;
                if (data.mode == "PRODUCTION") {
                    buildMode = .PRODUCTION
                }
                
                var locale = MyIdLocale.EN;
                if (data.locale == "ru") {
                    locale = .RU;
                }
                if (data.locale == "uz") {
                    locale = .UZ;
                }
                
                let config = MyIdConfig();
                config.clientId = client_id;
                config.clientHash = clientHash;
                config.clientHashId = clientHashId;
                config.buildMode = buildMode;
                config.locale = locale;
                MyIdClient.start(withConfig: config, withDelegate: self);
            }
        }
    }
}


extension ExpoMyidModule: MyIdClientDelegate {
    public func onSuccess(result: MyIdResult) {
        if let code = result.code {
            print(code)
            
            self.sendEvent("onMyid", ["code": result.code, "status": "success", "error": ""])
        }
        
    }
    
    public func onError(exception: MyIdException) {
        self.sendEvent("onMyid", ["code": "", "status": "error", "error": exception.message])
    }
    
    public  func onUserExited() {
        print("User exited")
    }
}
