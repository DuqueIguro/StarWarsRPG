# 1. Garanta que todas as alterações na staging foram commitadas e enviadas
git checkout staging
git push origin staging

# 2. Mude para a branch main
git checkout main

# 3. Puxe as últimas atualizações da main remota (boa prática para evitar conflitos)
git pull origin main

# 4. Mescle o conteúdo da staging dentro da main
git merge staging

# 5. Envie a main atualizada para o repositório remoto
git push origin main
