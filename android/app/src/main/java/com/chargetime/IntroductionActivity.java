package com.chargetime;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class IntroductionActivity extends AppCompatActivity {

    private static final String PREFS_NAME = "MyPrefs";
    private static final String PREF_REGISTERED = "registered";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.introduction);

        // Check if the user is already registered
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        boolean isRegistered = prefs.getBoolean(PREF_REGISTERED, false);

        if (isRegistered) {
            // User is already registered, proceed to the MainActivity
            startMainActivity();
            return;
        }

        Button getStartedButton = findViewById(R.id.get_started_button);
        getStartedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Set the registered flag to true
                prefs.edit().putBoolean(PREF_REGISTERED, true).apply();

                // Start the MainActivity
                startMainActivity();
            }
        });
    }

    private void startMainActivity() {
        Intent intent = new Intent(IntroductionActivity.this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}
