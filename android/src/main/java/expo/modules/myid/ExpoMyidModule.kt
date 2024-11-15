package expo.modules.myid

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import expo.modules.core.interfaces.ActivityEventListener

import expo.modules.core.interfaces.LifecycleEventListener
import expo.modules.core.interfaces.ReactActivityLifecycleListener
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.records.Field
import uz.myid.android.sdk.capture.MyIdClient
import uz.myid.android.sdk.capture.MyIdConfig
import uz.myid.android.sdk.capture.MyIdException
import uz.myid.android.sdk.capture.MyIdResult
import uz.myid.android.sdk.capture.MyIdResultListener
import uz.myid.android.sdk.capture.model.MyIdBuildMode
import java.net.URL
import java.util.Locale
import expo.modules.kotlin.records.Record

class MyIdProps : Record {
    @Field
    val clientId: String = ""

    @Field
    val clientHashId: String = ""

    @Field
    val clientHash: String = ""

    @Field
    val mode: String = "DEBUG"

    @Field
    val locale: String = "ru"
}


class ExpoMyidModule : Module(), MyIdResultListener,
    ReactActivityLifecycleListener {
    private val myIdClient = MyIdClient()
    private val selfMyIdModule = this


    override fun onNewIntent(intent: Intent): Boolean {
        super.onNewIntent(intent)

        return true
    }

    override fun definition() = ModuleDefinition {
        Name("ExpoMyid")

        // Defines event names that the module can send to JavaScript.
        Events("onMyid")


        OnActivityResult { _, payload ->
            myIdClient.handleActivityResult(payload.resultCode, selfMyIdModule)
        }

        AsyncFunction("myid_login") { data: MyIdProps ->
            val activity = appContext.currentActivity ?: return@AsyncFunction "";
            var m = MyIdBuildMode.DEBUG

            if (data.mode.equals("PRODUCTION") ) {
                m = MyIdBuildMode.PRODUCTION
            }

            val config = MyIdConfig.builder(clientId = data.clientId)
                .withClientHash(data.clientHash, data.clientHashId)
                .withBuildMode(m)
                .withLocale(Locale(data.locale))
                .build()
            myIdClient.startActivityForResult(activity, 1, config)
        }
    }

    override fun onError(exception: MyIdException) {
        sendEvent(
            "onMyid", mapOf(
                "code" to "",
                "status" to "error",
                "error" to exception.message
            )
        )
    }

    override fun onSuccess(result: MyIdResult) {
        sendEvent(
            "onMyid", mapOf(
                "code" to result.code,
                "status" to "success",
                "error" to ""
            )
        )
    }

    override fun onUserExited() {
       return
    }
}
