package com.chargetime;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.chargetime.R;
import com.chargetime.MainActivity;


public class IntroductionActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_introduction);

        // Add any necessary code for the introduction screen

        // Navigate to MainActivity
        Intent intent = new Intent(IntroductionActivity.this, MainActivity.class);
        startActivity(intent);

        // Finish the current activity
        finish();
    }
}
