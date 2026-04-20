<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "mypetshop";
//variable de conexion

$conn = new mysqli($servername, $username, $password, $dbname);
if($conn->connect_error){
    http_response_code(500);
    die(json_encode(array("error" => "conexión mala: " . $conn->connect_error)));
}
//metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $id=$_GET['id'] ?? null;
        if($id){
            $stmt=$conn->prepare("SELECT * FROM cliente WHERE id = ?");//es nuestra consulta
            $stmt->bind_param("s",$id);
            $stmt->execute();//ejecutamos la consulta
            $result=$stmt->get_result();
            $cliente=$result->fetch_assoc();
            //en cso de prueba consola 
            echo json_encode($cliente);
        }else{
            $result=$conn->query("SELECT * FROM cliente");
            $clientes=[];
            while($row=$result->fetch_assoc()){
                $clientes[]=$row;
            }
            //en caso de prueba 
            echo json_encode($clientes);
        } 
    break;
    case 'POST':
        $input=json_decode(file_get_contents('php://input'), TRUE);
        $id=$input['id'] ?? uniqid();
        $nombre=$input['nombre'];
        $email=$input['email'];
        $stmt=$conn->prepare("INSERT INTO clientes (id, nombre, email) VALUES (?,?,?)");
        $stmt->bind_param("sss", $id, $nombre, $email);
        if($stmt->execute()){
            http_response_code(201);//creado correctamente
            //verificacion
            echo json_encode(["message"=>"creado exitosamente", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["message"=>"todo mal"]);
        }
        break;
    case 'PUT':
        $input=json_decode(file_get_contents('php://input'), TRUE);
        $id=$input['id'];
        $nombre=$input['nombre'];
        $email=$input['email'];
        $stmt=$conn->prepare("UPDATE clientes SET nombre=?, email=? WHERE id=?");
        $stmt->bind_param("sss", $nombre, $email, $id);
        if($stmt->execute()){
            http_response_code(201);//actualizado correctamente
            //verificacion
            echo json_encode(["message"=>"actualizado exitosamente"]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"todo mal"]);
        }
        break;
    case 'DELETE':
        $id=$_GET['id'];
        $stmt=$conn->prepare("DELETE FROM clientes WHERE id=?");
        $stmt->bind_param("s",$id);
        if($stmt->execute()){
            //verificacion
            echo json_encode(["message"=>"elimiado exitosamente"]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"todo mal"]);
        }
        break;
    default:
    http_response_code(405);
    echo json_encode(["error"=>"todo mal"]);
    }
    $conn->close();
?>