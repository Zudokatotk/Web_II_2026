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

//obtener la tabla desde el parametro
$tabla = $_GET['tabla'] ?? 'clientes';

//validar que la tabla sea valida
$tablas_validas = ['clientes', 'pets', 'productos'];
if(!in_array($tabla, $tablas_validas)){
    http_response_code(400);
    die(json_encode(array("error" => "tabla no valida")));
}

//metodos get, post, put, delete
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        $id=$_GET['id'] ?? null;
        if($id){
            $stmt=$conn->prepare("SELECT * FROM $tabla WHERE id = ?");//es nuestra consulta
            $stmt->bind_param("s",$id);
            $stmt->execute();//ejecutamos la consulta
            $result=$stmt->get_result();
            $registro=$result->fetch_assoc();
            //en caso de prueba consola 
            echo json_encode($registro);
        }else{
            $result=$conn->query("SELECT * FROM $tabla");
            $registros=[];
            while($row=$result->fetch_assoc()){
                $registros[]=$row;
            }
            //en caso de prueba 
            echo json_encode($registros);
        } 
    break;
    
    case 'POST':
        $input=json_decode(file_get_contents('php://input'), TRUE);
        $id=$input['id'] ?? uniqid();
        
        //segun la tabla, insertar diferentes campos
        if($tabla == 'clientes'){
            $nombre=$input['nombre'];
            $email=$input['email'];
            $stmt=$conn->prepare("INSERT INTO clientes (id, nombre, email) VALUES (?,?,?)");
            $stmt->bind_param("sss", $id, $nombre, $email);
        }
        elseif($tabla == 'pets'){
            $nombre=$input['nombre'];
            $edad=$input['edad'];
            $peso=$input['peso'];
            $raza=$input['raza'];
            $id_dueno=$input['id_dueno'];
            $stmt=$conn->prepare("INSERT INTO pets (id, nombre, edad, peso, raza, id_dueno) VALUES (?,?,?,?,?,?)");
            $stmt->bind_param("ssisss", $id, $nombre, $edad, $peso, $raza, $id_dueno);
        }
        elseif($tabla == 'productos'){
            $nombre=$input['nombre'];
            $precio=$input['precio'];
            $description=$input['description'];
            $stmt=$conn->prepare("INSERT INTO productos (id, nombre, precio, description) VALUES (?,?,?,?)");
            $stmt->bind_param("ssds", $id, $nombre, $precio, $description);
        }
        
        if($stmt->execute()){
            http_response_code(201);//creado correctamente
            //verificacion
            echo json_encode(["message"=>"creado exitosamente", "id"=>$id]);
        }else{
            http_response_code(500);
            echo json_encode(["message"=>"todo mal", "error"=>$stmt->error]);
        }
        break;
        
    case 'PUT':
        $input=json_decode(file_get_contents('php://input'), TRUE);
        $id=$input['id'];
        
        //segun la tabla, actualizar diferentes campos
        if($tabla == 'clientes'){
            $nombre=$input['nombre'];
            $email=$input['email'];
            $stmt=$conn->prepare("UPDATE clientes SET nombre=?, email=? WHERE id=?");
            $stmt->bind_param("sss", $nombre, $email, $id);
        }
        elseif($tabla == 'pets'){
            $nombre=$input['nombre'];
            $edad=$input['edad'];
            $peso=$input['peso'];
            $raza=$input['raza'];
            $id_dueno=$input['id_dueno'];
            $stmt=$conn->prepare("UPDATE pets SET nombre=?, edad=?, peso=?, raza=?, id_dueno=? WHERE id=?");
            $stmt->bind_param("sissss", $nombre, $edad, $peso, $raza, $id_dueno, $id);
        }
        elseif($tabla == 'productos'){
            $nombre=$input['nombre'];
            $precio=$input['precio'];
            $description=$input['description'];
            $stmt=$conn->prepare("UPDATE productos SET nombre=?, precio=?, description=? WHERE id=?");
            $stmt->bind_param("sdss", $nombre, $precio, $description, $id);
        }
        
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
        $stmt=$conn->prepare("DELETE FROM $tabla WHERE id=?");
        $stmt->bind_param("s",$id);
        if($stmt->execute()){
            //verificacion
            echo json_encode(["message"=>"eliminado exitosamente"]);
        }else{
            http_response_code(500);
            echo json_encode(["error"=>"todo mal"]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["error"=>"metodo no permitido"]);
}
$conn->close();
?>
