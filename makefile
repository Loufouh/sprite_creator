clear:
	@rm .*.swp || echo  "\033[0;33mRoot already clean !\033[0m"
	@rm img/.*.swp || echo "\033[0;33mimg/ already clean !\033[0m" 
	@rm inc/.*.swp || echo "\033[0;33minc/ already clean !\033[0m"
	@rm inc/draw/.*.swp || echo "\033[0;33minc/draw/ already clean !\033[0m" 
	@echo "\033[1;36m--------------\033[0m"
	@echo "\033[1;36mCleaned up !\033[0m"
	@echo "\033[1;36m--------------\033[0m"
