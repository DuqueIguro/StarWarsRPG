# Staging to Main Synchronization Script

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

# ==========================================================================================

# Main to Staging Synchronization Script

# 1. Garanta que todas as alterações na staging foram commitadas e enviadas
git checkout main
git push origin main

# 2. Mude para a branch main
git checkout staging

# 3. Puxe as últimas atualizações da main remota (boa prática para evitar conflitos)
git pull origin staging

# 4. Mescle o conteúdo da staging dentro da main
git merge main

# 5. Envie a staging atualizada para o repositório remoto
git push origin staging