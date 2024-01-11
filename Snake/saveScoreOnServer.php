<?php

// Path to the JSON file
$jsonFilePath = 'hScore.json';

// Get the incoming JSON data
$jsonData = file_get_contents('php://input');

// Decode the JSON data
$newData = json_decode($jsonData, true);

if ($newData !== null) {
    // Read existing data from the file
    $existingData = json_decode(file_get_contents($jsonFilePath), true);

    if ($existingData !== null) {
        // Merge the new data with the existing data
        $existingData['users'] = $newData['users'];

        // Sort the array based on score in descending order
        usort($existingData['users'], function ($a, $b) {
            return $b['score'] - $a['score'];
        });

        // Write the updated data back to the file
        file_put_contents($jsonFilePath, json_encode($existingData));

        // Return a success response
        http_response_code(200);
        echo json_encode(['message' => 'Score saved successfully']);
    } else {
        // Return an error response if existing data couldn't be read
        http_response_code(500);
        echo json_encode(['error' => 'Internal server error']);
    }
} else {
    // Return an error response if JSON data couldn't be decoded
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
}

?>
