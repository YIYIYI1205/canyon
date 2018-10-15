<?php

	$items=array(
				
				array("id"=>1,"title"=>"CYM0001","img"=>".../images/hot/1.jpg","describe"=>"Men's Hybrid Shorts, satin microfibre ,pigment print with heavy enzyme wash","img-f"=>"../images/men/1(f).jpg"),
				array("id"=>2,"title"=>"CYM0002","img"=>".../images/hot/2.jpg","describe"=>"Men's Hybrid Shorts, satin microfibre ,pigment print with heavy enzyme wash","img-f"=>""),
				
			);

	$type=$_GET["type"];
	echo json_encode($items);
