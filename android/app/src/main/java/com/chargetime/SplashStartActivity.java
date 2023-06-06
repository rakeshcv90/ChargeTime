package com.chargetime;


import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import com.chargetime.R;
import androidx.appcompat.app.AppCompatActivity;

public class SplashStartActivity extends AppCompatActivity {

    private static final long DELAY_DURATION = 2000; // Delay in milliseconds (2 seconds)

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the layout for the activity (if you have a specific layout)
        setContentView(R.layout.activity_splash_start);

        // Delayed navigation to IntroductionActivity
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashStartActivity.this, IntroductionActivity.class);
                startActivity(intent);
                finish(); // Finish this activity so it doesn't appear in back stack
            }
        }, DELAY_DURATION);
    }
}
