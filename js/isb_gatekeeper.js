async function verificarCredenciaisISB() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'isb-security-overlay';
    loadingDiv.innerHTML = `
        <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:#050308; z-index:99999; display:flex; flex-direction:column; align-items:center; justify-content:center; color:#ef4444; font-family:monospace; text-align:center;">
            <svg style="width:50px; height:50px; margin-bottom:15px; animation: pulse 2s infinite;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <h2 style="font-size:1.5rem; font-weight:bold; letter-spacing:0.2em;">VERIFICANDO CREDENCIAIS ISB...</h2>
            <p style="font-size:0.8rem; color:#78716c; margin-top:10px;">Acesso restrito. Tentativas de invasão serão reportadas.</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);

    const { data: userData, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !userData.user) {
        alert("ALERTA DE INTRUSÃO: Autenticação biométrica requerida.");
        window.location.href = '../index.html';
        return;
    }

    const { data: perm, error: permError } = await supabaseClient
        .from('permissoes')
        .select('cargo')
        .eq('user_id', userData.user.id)
        .single();

    if (permError) {
        console.error("[ISB GATEKEEPER] Erro no banco de dados:", permError);
    }

    if (permError || !perm || (perm.cargo !== 'mestre' && perm.cargo !== 'dev')) {
        alert("ACESSO NEGADO: Suas credenciais não possuem autorização nível ISB. O incidente foi registrado.");
        window.location.href = '../menu.html';
        return;
    }

    const overlay = document.getElementById('isb-security-overlay');
    if (overlay) overlay.remove();
}

verificarCredenciaisISB();