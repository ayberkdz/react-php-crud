<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: *');

include 'DbConnect.php';

$db = new DbConnect();
$conn = $db->connect();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        $user =  json_decode(file_get_contents('php://input'));
        $stmt = $conn->prepare("INSERT INTO users(name, email, mobile, created_at) VALUES(:name, :email, :mobile, :createdAt)");
        $createdAt = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':createdAt', $createdAt);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Successfull added'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed'];
        }
        break;
    
    case 'PUT':
        $user =  json_decode(file_get_contents('php://input'));
        $stmt = $conn->prepare("UPDATE users SET name = :name, email = :email, mobile = :mobile, created_at = :createdAt WHERE id = :id");
        $createdAt = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':createdAt', $createdAt);
        $stmt->bindParam(':id', $user->id);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Successfully updated'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed update'];
        }
        break;
        

    case 'GET':
            $sql = 'SELECT * FROM users ';
            $path = explode('/', $_SERVER['REQUEST_URI']);
            if (isset($path[3]) && is_numeric($path[3])) {
                $sql .= 'WHERE id = :id';
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[3]);
                $stmt->execute();
                $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            } else {
                $stmt = $conn->prepare($sql);
                $stmt->execute();
                $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }
            
            echo json_encode($users);
        break;

    case 'DELETE':
        $sql = 'DELETE FROM users WHERE id = :id';
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Successfully deleted'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed delete'];
        }
    break;
    
    default:
        break;
}
