for f in `find . -maxdepth 1 -mindepth 1 -type d|grep /`; do echo pushing $f; /home/usrmiclaro/wps/sp_cmdln_Compras/sp.sh push -socketTimeout 1200000 -contentRoot $f; done
