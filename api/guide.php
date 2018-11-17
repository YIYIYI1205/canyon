<?php

	$items=array(

				array("first"=>array("beach shorts","sports wears","pants","swimming wears","knit wears","others"),
						"second"=>array(array("beach shorts","men's shorts","women's shorts","kids shorts"),
										array("sports wears","MMA shorts","boxing shorts","track suits","TKD uniform","compressions")
									),
								
				),
				
				
				// "second"=>array("beach shorts"=>array("men's shorts","women's shorts","kids shorts"),
				// 				"sports wears"=>array("MMA shorts","boxing shorts","track suits","TKD uniform","compressions")
				// 				)

				// array(
				// 	"hot"=>array(),
				// 	"beach shorts"=>array("men's shorts","women's shorts","kids shorts"),
				// 	"sports wears"=>array("MMA shorts","boxing shorts","track suits","TKD uniform","compressions"),
				// 	"pants"=>array(),
				// 	"swimming wears"=>array(),
				// 	"knit wears"=>array(),
				// 	"others"=>array()
				// )

				
			);

	
	echo json_encode($items);
