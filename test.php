    <?php
    $host='localhost';
    $uername='root';
    $dbname='gestion_conges';
    $password='';
    try{
        $pdo=new PDO("mysql:host=$host;dbname=$dbname",$uername,$password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        reset($pdo);
    }catch(PDOException $a){
        die("Erreur de connexion à la base de données: ".$a->getMessage()); 
    }
    ?>