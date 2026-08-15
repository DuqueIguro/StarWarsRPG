/**
 * CONTROLADOR PRINCIPAL DO MACRO // GENERAL DUR'TOC TERMINAL
 */

class MacroTerminalApp {
    constructor() {
        this.state = {
            turn: 1,
            facilities: JSON.parse(JSON.stringify(INITIAL_FACILITIES)),
            assets: JSON.parse(JSON.stringify(INITIAL_ASSETS)),
            catalog: JSON.parse(JSON.stringify(INITIAL_CATALOG)),
            rdProgress: 15, // 0 to 100
            rdPoints: 15,
            logs: []
        };
        this.currentSelectedFacility = 'mcmt1';
    }

    init() {
        this.loadStorage();
        this.bindEvents();
        this.renderAll();
        this.log("SISTEMA DE CONTROLE MACRO INICIALIZADO.", "SUCCESS");
        this.log("CONEXÃO ESTABELECIDA COM LOTHAL & CORUSCANT.", "INFO");
    }

    loadStorage() {
        const saved = localStorage.getItem("durtoc_macro_state");
        if (saved) {
            try {
                this.state = JSON.parse(saved);
            } catch (e) {
                console.error("Erro ao carregar storage:", e);
            }
        }
    }

    saveStorage() {
        localStorage.setItem("durtoc_macro_state", JSON.stringify(this.state));
    }

    bindEvents() {
        // Nav tabs
        document.querySelectorAll(".nav-tab").forEach(tab => {
            tab.addEventListener("click", (e) => {
                document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
                tab.classList.add("active");
                const targetId = tab.getAttribute("data-target");
                document.getElementById(targetId).classList.add("active");
                sfx.playClick();
            });
        });

        // Turn Advance
        document.getElementById("btn-turn-advance").addEventListener("click", () => {
            this.advanceTurn();
        });

        // Action select change
        document.getElementById("macro-action-select").addEventListener("change", () => {
            this.renderActionContextView();
            sfx.playClick();
        });

        document.getElementById("btn-execute-action").addEventListener("click", () => {
            this.executeSelectedAction();
        });

        // CRT Toggle
        document.getElementById("btn-crt-toggle").addEventListener("click", () => {
            document.body.classList.toggle("crt-active");
            sfx.playClick();
        });

        // Sound Toggle
        document.getElementById("btn-sound-toggle").addEventListener("click", (e) => {
            sfx.enabled = !sfx.enabled;
            e.target.innerText = sfx.enabled ? "🔊 SFX: ON" : "🔇 SFX: OFF";
            sfx.playClick();
        });

        // Save & Reset Buttons
        document.getElementById("btn-save-data").addEventListener("click", () => {
            this.saveStorage();
            this.log("ESTADO SALVO NO BANCO DE DADOS LOCAL.", "SUCCESS");
            sfx.playSuccess();
        });

        document.getElementById("btn-reset-data").addEventListener("click", () => {
            if (confirm("ATENÇÃO: Deseja resetar todo o progresso do macro para os valores de fábrica?")) {
                localStorage.removeItem("durtoc_macro_state");
                location.reload();
            }
        });

        // P&D Injection
        document.getElementById("btn-inject-ci").addEventListener("click", () => {
            const val = parseInt(document.getElementById("input-rd-ci").value) || 0;
            this.injectRDResource("CI", val);
        });

        document.getElementById("btn-inject-fc").addEventListener("click", () => {
            const val = parseInt(document.getElementById("input-rd-fc").value) || 0;
            this.injectRDResource("FC", val);
        });

        // Exchange
        document.getElementById("btn-execute-exchange").addEventListener("click", () => {
            this.executeExchange();
        });

        document.getElementById("exchange-amount-fc").addEventListener("input", () => {
            this.updateExchangePreview();
        });

        document.querySelectorAll("input[name='exchange-type']").forEach(r => {
            r.addEventListener("change", () => this.updateExchangePreview());
        });

        // Filter Assets
        document.getElementById("filter-location").addEventListener("change", () => this.renderAssetsTable());
        document.getElementById("filter-type").addEventListener("change", () => this.renderAssetsTable());

        // Catalog modal trigger
        document.getElementById("btn-open-catalog").addEventListener("click", () => {
            this.openCatalogModal();
        });

        // Edit facility save
        document.getElementById("btn-save-facility-changes").addEventListener("click", () => {
            this.saveFacilityEdit();
        });

        // Clear logs
        document.getElementById("btn-clear-logs").addEventListener("click", () => {
            this.state.logs = [];
            this.renderLogs();
        });
    }

    renderAll() {
        this.renderTotals();
        this.renderQuickHierarchy();
        this.renderFacilitiesCards();
        this.renderAssetsTable();
        this.renderRDView();
        this.renderExchangeSelects();
        this.renderActionContextView();
        this.renderLogs();
    }

    renderTotals() {
        let totalCI = 0;
        let totalFC = 0;
        Object.values(this.state.facilities).forEach(f => {
            totalCI += f.credits;
            totalFC += f.faccreds;
        });

        document.getElementById("display-turn").innerText = String(this.state.turn).padStart(2, '0');
        document.getElementById("display-total-ci").innerText = totalCI.toLocaleString('pt-BR') + " CI";
        document.getElementById("display-total-fc").innerText = totalFC.toLocaleString('pt-BR') + " FC";
    }

    renderQuickHierarchy() {
        const mcmt1 = this.state.facilities.mcmt1;
        const mcmt2 = this.state.facilities.mcmt2;
        const fab1 = this.state.facilities.fab1;
        const fab2 = this.state.facilities.fab2;
        const lab = this.state.facilities.lab_tie;

        if (mcmt1) document.getElementById("quick-mcmt1").innerText = `CI: ${mcmt1.credits.toLocaleString()} | FC: ${mcmt1.faccreds}`;
        if (mcmt2) document.getElementById("quick-mcmt2").innerText = `CI: ${mcmt2.credits.toLocaleString()} | FC: ${mcmt2.faccreds}`;
        if (fab1) document.getElementById("quick-fab1").innerText = `CI: ${fab1.credits.toLocaleString()} | FC: ${fab1.faccreds}`;
        if (fab2) document.getElementById("quick-fab2").innerText = `CI: ${fab2.credits.toLocaleString()} | FC: ${fab2.faccreds}`;
        if (lab) document.getElementById("quick-lab").innerText = `PROJETO: ${this.state.rdProgress}% | FC: ${lab.faccreds}`;
    }

    renderFacilitiesCards() {
        const container = document.getElementById("facilities-container");
        if (!container) return;
        container.innerHTML = "";

        Object.values(this.state.facilities).forEach(f => {
            const card = document.createElement("div");
            card.className = "fac-card";
            const netIncome = f.incomeCI - f.laborCostCI;

            card.innerHTML = `
                <div class="fac-card-header">
                    <div>
                        <div class="node-tag">${f.type.toUpperCase()} // ${f.location.toUpperCase()}</div>
                        <div class="fac-card-title">${f.name}</div>
                    </div>
                    <button class="btn-action-secondary btn-sm" onclick="app.editFacility('${f.id}')">⚙️ GERENCIAR</button>
                </div>
                <div class="fac-card-body">
                    <p class="text-dim" style="font-size: 11px;">${f.description}</p>
                    <div class="fac-stat-grid">
                        <div class="fac-stat-box">
                            <div class="lbl">CRÉDITOS (CI):</div>
                            <div class="val text-gold">${f.credits.toLocaleString('pt-BR')} CI</div>
                        </div>
                        <div class="fac-stat-box">
                            <div class="lbl">FACCREDS (FC):</div>
                            <div class="val text-cyan">${f.faccreds} FC</div>
                        </div>
                        <div class="fac-stat-box">
                            <div class="lbl">RECEITA ESTIMADA:</div>
                            <div class="val text-accent">+${f.incomeCI.toLocaleString('pt-BR')} CI</div>
                        </div>
                        <div class="fac-stat-box">
                            <div class="lbl">LUCRO LÍQUIDO/TURNO:</div>
                            <div class="val ${netIncome >= 0 ? 'text-accent' : 'text-danger'}">${netIncome >= 0 ? '+' : ''}${netIncome.toLocaleString('pt-BR')} CI</div>
                        </div>
                    </div>
                    <div class="fac-upkeep-list">
                        <div>⚠️ <strong>Custos por Giro:</strong></div>
                        <div>• Mão de Obra: -${f.laborCostCI.toLocaleString('pt-BR')} CI</div>
                        <div>• Manutenção Maquinário: -${f.maintCostFC} FC</div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    renderAssetsTable() {
        const tbody = document.getElementById("assets-table-body");
        const locFilter = document.getElementById("filter-location").value;
        const typeFilter = document.getElementById("filter-type").value;

        const filtered = this.state.assets.filter(a => {
            const matchLoc = (locFilter === "ALL" || a.location === locFilter);
            const matchType = (typeFilter === "ALL" || a.category === typeFilter);
            return matchLoc && matchType;
        });

        document.getElementById("assets-count-badge").innerText = `TOTAL DE ATIVOS: ${this.state.assets.length}`;

        tbody.innerHTML = filtered.map(a => {
            const hpPercent = Math.round((a.hp / a.hpMax) * 100);
            return `
                <tr>
                    <td><span class="status-indicator online"></span> ${a.status}</td>
                    <td><strong>${a.name}</strong></td>
                    <td>${a.category}</td>
                    <td>${a.location}</td>
                    <td>
                        <span class="${a.hp < a.hpMax ? 'text-gold' : 'text-accent'}">${a.hp} / ${a.hpMax} HP</span>
                        <div style="width: 60px; height: 4px; background: #000; margin-top:2px;">
                            <div style="width: ${hpPercent}%; height: 100%; background: ${a.hp < a.hpMax ? '#ffcc00' : '#00ff66'};"></div>
                        </div>
                    </td>
                    <td>-${(a.maintCI || 0).toLocaleString()} CI</td>
                    <td><span class="text-dim">Pronto para despacho</span></td>
                    <td>
                        <button class="btn-tool" onclick="app.damageAsset('${a.id}', 3)" title="Simular Dano">-3 HP</button>
                        <button class="btn-tool" onclick="app.repairSpecificAsset('${a.id}')" title="Reparar com Faccreds">🔧 Reparar</button>
                        <button class="btn-tool btn-danger-subtle" onclick="app.deleteAsset('${a.id}')" title="Desmantelar/Remover">🗑️</button>
                    </td>
                </tr>
            `;
        }).join("");
    }

    renderRDView() {
        const p = this.state.rdProgress;
        document.getElementById("rd-progress-percent").innerText = `${p}%`;
        document.getElementById("rd-progress-bar").style.width = `${p}%`;
        document.getElementById("rd-points-accum").innerText = `${this.state.rdPoints} / 100 PTS`;

        // Label update
        const label = document.getElementById("rd-status-label");
        if (p < 25) label.innerText = "FASE 1: CONCEPÇÃO & ESTRUTURA";
        else if (p < 50) label.innerText = "FASE 2: PROTÓTIPO DE ESCUDO";
        else if (p < 75) label.innerText = "FASE 3: HIPERPROPULSÃO";
        else if (p < 100) label.innerText = "FASE 4: TESTES DE VOO EM LOTHAL";
        else label.innerText = "FASE 5: HOMOLOGADO // PRONTO PARA PRODUÇÃO";

        // Milestone classes
        const ms1 = document.getElementById("ms-1");
        const ms2 = document.getElementById("ms-2");
        const ms3 = document.getElementById("ms-3");
        const ms4 = document.getElementById("ms-4");
        const ms5 = document.getElementById("ms-5");

        if (p >= 20) { ms1.classList.add("completed"); ms1.querySelector(".ms-check").innerText = "✓"; }
        if (p >= 40) { ms2.classList.add("completed"); ms2.querySelector(".ms-check").innerText = "✓"; }
        if (p >= 65) { ms3.classList.add("completed"); ms3.querySelector(".ms-check").innerText = "✓"; }
        if (p >= 85) { ms4.classList.add("completed"); ms4.querySelector(".ms-check").innerText = "✓"; }
        if (p >= 100) { ms5.classList.add("completed"); ms5.querySelector(".ms-check").innerText = "✓"; }
    }

    renderExchangeSelects() {
        const select = document.getElementById("exchange-source");
        select.innerHTML = Object.values(this.state.facilities).map(f => {
            return `<option value="${f.id}">${f.name} (Saldo: ${f.credits.toLocaleString()} CI | ${f.faccreds} FC)</option>`;
        }).join("");
        this.updateExchangePreview();
    }

    updateExchangePreview() {
        const type = document.querySelector("input[name='exchange-type']:checked").value;
        const amountFC = parseInt(document.getElementById("exchange-amount-fc").value) || 0;
        const preview = document.getElementById("exchange-total-calc");

        if (type === "buy_fc") {
            const cost = amountFC * 100000;
            preview.innerText = `Custo: ${cost.toLocaleString('pt-BR')} CI (Ganho: +${amountFC} FC)`;
        } else {
            const gain = amountFC * 90000;
            preview.innerText = `Retorno: +${gain.toLocaleString('pt-BR')} CI (Custo: -${amountFC} FC)`;
        }
    }

    renderActionContextView() {
        const action = document.getElementById("macro-action-select").value;
        const container = document.getElementById("action-dynamic-view");

        switch (action) {
            case "attack":
                container.innerHTML = `
                    <h4>⚔️ ATACAR ATIVO INIMIGO</h4>
                    <p class="text-dim">Despache forças de assalto ou frotas de combate para neutralizar células ou postos inimigos em Lothal/Coruscant.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Selecionar Força Atacante:</label>
                        <select id="act-attack-source" class="terminal-select">
                            ${this.state.assets.filter(a => a.category === 'Militar').map(a => `<option value="${a.id}">${a.name} (${a.hp} HP) - ${a.location}</option>`).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Designação do Alvo Inimigo:</label>
                        <input type="text" id="act-attack-target" class="terminal-input" placeholder="Ex: Esconderijo Rebelde em Lothal">
                    </div>
                `;
                break;
            case "buy":
                container.innerHTML = `
                    <h4>🛒 COMPRAR ATIVO ESTRATÉGICO</h4>
                    <p class="text-dim">Adquira novos regimentos militares, células de inteligência ou cargueiros pesados para fortalecer suas operações.</p>
                    <button class="btn-action-primary" style="margin-top:10px;" onclick="app.openCatalogModal()">ABRIR CATÁLOGO DE ATIVOS (15 DISPONÍVEIS)</button>
                `;
                break;
            case "repair":
                container.innerHTML = `
                    <h4>🔧 REPARAR ATIVO (REGRA: 1 FC = 1 HP)</h4>
                    <p class="text-dim">Gaste Faccreds de uma oficina ou fábrica para restaurar a integridade estrutural de veículos e tropas.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Ativo Avariado:</label>
                        <select id="act-repair-target" class="terminal-select">
                            ${this.state.assets.map(a => `<option value="${a.id}">${a.name} [${a.hp}/${a.hpMax} HP] - ${a.location}</option>`).join("")}
                        </select>
                    </div>
                `;
                break;
            case "outpost":
                container.innerHTML = `
                    <h4>🏛️ CRIAR POSTO AVANÇADO / BASE DE INFLUÊNCIA</h4>
                    <p class="text-dim">Estabelece uma nova filial tática. Necessário para recrutar e comprar ativos em novas regiões.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Nome da Nova Base / Planeta:</label>
                        <input type="text" id="act-outpost-name" class="terminal-input" placeholder="Ex: Posto Avançado Lothal Norte">
                    </div>
                `;
                break;
            case "ability":
                container.innerHTML = `
                    <h4>⚡ USAR HABILIDADE DO ATIVO</h4>
                    <p class="text-dim">Ative manobras de Sabotagem (paralisar turno), Bloqueio Orbital (drenar 1d4 de riqueza) ou Contrainteligência.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Selecione o Ativo Operador:</label>
                        <select id="act-ability-source" class="terminal-select">
                            ${this.state.assets.map(a => `<option value="${a.id}">${a.name} (${a.category}) - ${a.location}</option>`).join("")}
                        </select>
                    </div>
                `;
                break;
            case "move":
                container.innerHTML = `
                    <h4>🚀 MOVER ATIVO</h4>
                    <p class="text-dim">Redesdobre unidades entre Lothal, Coruscant e Setor Orbital.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Ativo a Mover:</label>
                        <select id="act-move-source" class="terminal-select">
                            ${this.state.assets.map(a => `<option value="${a.id}">${a.name} (Atual: ${a.location})</option>`).join("")}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Destino:</label>
                        <select id="act-move-dest" class="terminal-select">
                            <option value="Coruscant">Coruscant</option>
                            <option value="Lothal">Lothal</option>
                            <option value="Orbital">Setor Orbital</option>
                        </select>
                    </div>
                `;
                break;
            case "influence":
                container.innerHTML = `
                    <h4>🚩 EXPANDIR INFLUÊNCIA</h4>
                    <p class="text-dim">Aumenta o controle político e militar de Dur'toc na administração planetária.</p>
                    <div class="form-group" style="margin-top:8px;">
                        <label>Alocar Recursos de Influência:</label>
                        <input type="number" id="act-influence-ci" class="terminal-input" value="50000" step="10000">
                    </div>
                `;
                break;
            case "pass":
                container.innerHTML = `
                    <h4>⏭️ PASSAR A VEZ</h4>
                    <p class="text-dim">Nenhuma manobra tática ativa executada. O General Dur'toc aguarda o próximo ciclo macro.</p>
                `;
                break;
        }
    }

    executeSelectedAction() {
        const action = document.getElementById("macro-action-select").value;
        sfx.playSuccess();

        switch (action) {
            case "attack":
                const target = document.getElementById("act-attack-target").value || "Alvo Desconhecido";
                this.log(`ORDEM DE ATAQUE: Ofensiva lançada contra [${target}].`, "DANGER");
                break;
            case "buy":
                this.openCatalogModal();
                break;
            case "repair":
                const targetId = document.getElementById("act-repair-target").value;
                this.repairSpecificAsset(targetId);
                break;
            case "outpost":
                const name = document.getElementById("act-outpost-name").value || "Posto Avançado";
                this.log(`NOVA BASE: Posto de Influência [${name}] estabelecido com sucesso.`, "SUCCESS");
                break;
            case "ability":
                this.log(`HABILIDADE ATIVADA: Operação tática executada com sucesso.`, "INFO");
                break;
            case "move":
                const aId = document.getElementById("act-move-source").value;
                const dest = document.getElementById("act-move-dest").value;
                const asset = this.state.assets.find(x => x.id === aId);
                if (asset) {
                    asset.location = dest;
                    this.log(`RECOLOCAÇÃO: Ativo [${asset.name}] movido para [${dest}].`, "INFO");
                    this.renderAssetsTable();
                }
                break;
            case "influence":
                this.log(`INFLUÊNCIA: Pressão política expandida no setor.`, "SUCCESS");
                break;
            case "pass":
                this.log(`MANOBRA: General Dur'toc passou a vez tática.`, "INFO");
                break;
        }
        this.saveStorage();
    }

    advanceTurn() {
        sfx.playAdvanceTurn();
        this.state.turn += 1;

        let totalIncomeTurn = 0;
        let totalLaborTurn = 0;
        let totalMaintFCTurn = 0;

        // Process each facility
        Object.values(this.state.facilities).forEach(f => {
            // Deduct labor
            f.credits -= f.laborCostCI;
            totalLaborTurn += f.laborCostCI;

            // Deduct maintenance FC
            if (f.faccreds >= f.maintCostFC) {
                f.faccreds -= f.maintCostFC;
                totalMaintFCTurn += f.maintCostFC;
            } else {
                this.log(`⚠️ ALERTA CRÍTICO: ${f.name} ficou sem Faccreds para manutenção!`, "WARNING");
                f.faccreds = 0;
            }

            // Add Income
            f.credits += f.incomeCI;
            totalIncomeTurn += f.incomeCI;
        });

        // Deduct asset CI maintenance
        let totalAssetMaint = 0;
        this.state.assets.forEach(a => {
            const cost = a.maintCI || 0;
            totalAssetMaint += cost;
            // deduct from fab1 by default
            if (this.state.facilities.fab1) {
                this.state.facilities.fab1.credits -= cost;
            }
        });

        this.log(`=== GIRO DO MACRO // CICLO TURNO ${this.state.turn} PROCESSADO ===`, "SUCCESS");
        this.log(`ECONOMIA: Receita Geral: +${totalIncomeTurn.toLocaleString()} CI | Salários: -${totalLaborTurn.toLocaleString()} CI | Ativos: -${totalAssetMaint.toLocaleString()} CI`, "INFO");
        this.log(`RECURSOS: Manutenção de Fábricas/Oficinas consumiu -${totalMaintFCTurn} FC.`, "INFO");

        this.saveStorage();
        this.renderAll();
    }

    injectRDResource(type, amount) {
        if (amount <= 0) return;
        const lab = this.state.facilities.lab_tie;

        if (type === "CI") {
            if (lab.credits < amount) {
                alert("Créditos insuficientes no saldo do Laboratório de P&D!");
                sfx.playWarning();
                return;
            }
            lab.credits -= amount;
            const pts = Math.floor(amount / 100000) * 1;
            this.state.rdPoints += pts;
            this.state.rdProgress = Math.min(100, Math.floor(this.state.rdPoints));
            this.log(`P&D TIE/d: Injeção de ${amount.toLocaleString()} CI gerou +${pts} Pontos de Pesquisa.`, "SUCCESS");
        } else if (type === "FC") {
            if (lab.faccreds < amount) {
                alert("Faccreds insuficientes no estoque do Laboratório de P&D!");
                sfx.playWarning();
                return;
            }
            lab.faccreds -= amount;
            const pts = Math.round(amount * 1.5);
            this.state.rdPoints += pts;
            this.state.rdProgress = Math.min(100, Math.floor(this.state.rdPoints));
            this.log(`P&D TIE/d: Injeção de ${amount} FC (Peças Nobres) gerou +${pts} Pontos de Pesquisa!`, "SUCCESS");
        }

        sfx.playSuccess();
        this.saveStorage();
        this.renderAll();
    }

    executeExchange() {
        const facId = document.getElementById("exchange-source").value;
        const fac = this.state.facilities[facId];
        const type = document.querySelector("input[name='exchange-type']:checked").value;
        const amountFC = parseInt(document.getElementById("exchange-amount-fc").value) || 0;

        if (amountFC <= 0) return;

        if (type === "buy_fc") {
            const cost = amountFC * 100000;
            if (fac.credits < cost) {
                alert("Créditos Imperiais insuficientes nesta instalação!");
                sfx.playWarning();
                return;
            }
            fac.credits -= cost;
            fac.faccreds += amountFC;
            this.log(`CÂMBIO REALIZADO: ${fac.name} comprou +${amountFC} FC por ${cost.toLocaleString()} CI.`, "SUCCESS");
        } else {
            if (fac.faccreds < amountFC) {
                alert("Faccreds insuficientes nesta instalação para venda!");
                sfx.playWarning();
                return;
            }
            const gain = amountFC * 90000;
            fac.faccreds -= amountFC;
            fac.credits += gain;
            this.log(`CÂMBIO REALIZADO: ${fac.name} liquidou -${amountFC} FC e recebeu +${gain.toLocaleString()} CI.`, "SUCCESS");
        }

        sfx.playSuccess();
        this.saveStorage();
        this.renderAll();
    }

    executeSalvage(type, costCI, minFC, maxFC) {
        const fac = this.state.facilities.mcmt1 || this.state.facilities.fab1;
        if (fac.credits < costCI) {
            alert(`Créditos insuficientes em ${fac.name} para adquirir este lote de desmanche!`);
            sfx.playWarning();
            return;
        }

        fac.credits -= costCI;
        const gainedFC = Math.floor(Math.random() * (maxFC - minFC + 1)) + minFC;
        fac.faccreds += gainedFC;

        sfx.playSuccess();
        this.log(`DESMANCHE MECÂNICO: Dur'toc desmontou sucata (-${costCI.toLocaleString()} CI) e recuperou +${gainedFC} FC!`, "SUCCESS");
        this.saveStorage();
        this.renderAll();
    }

    damageAsset(assetId, amount) {
        const asset = this.state.assets.find(a => a.id === assetId);
        if (asset) {
            asset.hp = Math.max(0, asset.hp - amount);
            sfx.playWarning();
            this.log(`AVARIA: Ativo [${asset.name}] sofreu dano e está com ${asset.hp}/${asset.hpMax} HP.`, "WARNING");
            this.saveStorage();
            this.renderAssetsTable();
        }
    }

    repairSpecificAsset(assetId) {
        const asset = this.state.assets.find(a => a.id === assetId);
        if (!asset) return;
        const missingHP = asset.hpMax - asset.hp;
        if (missingHP <= 0) {
            alert("Este ativo já está com 100% de integridade estrutural!");
            return;
        }

        const fac = this.state.facilities[asset.facilityId] || this.state.facilities.fab1;
        if (fac.faccreds < missingHP) {
            alert(`Faccreds insuficientes em ${fac.name}! Necessário: ${missingHP} FC (1 FC = 1 HP).`);
            sfx.playWarning();
            return;
        }

        fac.faccreds -= missingHP;
        asset.hp = asset.hpMax;
        sfx.playSuccess();
        this.log(`REPARO CONCLUÍDO: [${asset.name}] totalmente restaurado gastando ${missingHP} FC em ${fac.name}.`, "SUCCESS");
        this.saveStorage();
        this.renderAll();
    }

    deleteAsset(assetId) {
        if (confirm("Deseja desmantelar este ativo e dispensar suas operações?")) {
            this.state.assets = this.state.assets.filter(a => a.id !== assetId);
            sfx.playClick();
            this.saveStorage();
            this.renderAssetsTable();
        }
    }

    openCatalogModal() {
        const container = document.getElementById("catalog-items-container");
        container.innerHTML = this.state.catalog.map(item => {
            return `
                <div class="catalog-item-card">
                    <div>
                        <div class="catalog-item-name">${item.name}</div>
                        <div class="catalog-item-cost">Custo: ${item.costFC} FC (${item.costCI.toLocaleString('pt-BR')} CI)</div>
                        <div class="catalog-item-desc">${item.desc}</div>
                    </div>
                    <button class="btn-action-primary btn-sm" onclick="app.buyCatalogItem('${item.id}')">COMPRAR ATIVO</button>
                </div>
            `;
        }).join("");

        document.getElementById("modal-catalog").classList.add("show");
    }

    closeCatalogModal() {
        document.getElementById("modal-catalog").classList.remove("show");
    }

    buyCatalogItem(catalogId) {
        const item = this.state.catalog.find(c => c.id === catalogId);
        const targetFacId = document.getElementById("modal-target-facility").value;
        const fac = this.state.facilities[targetFacId] || this.state.facilities.fab1;

        if (fac.faccreds < item.costFC && fac.credits < item.costCI) {
            alert(`Recursos insuficientes em ${fac.name}! Necessário: ${item.costFC} FC ou ${item.costCI.toLocaleString()} CI.`);
            sfx.playWarning();
            return;
        }

        // Deduct preferably in FC, else in CI
        if (fac.faccreds >= item.costFC) {
            fac.faccreds -= item.costFC;
        } else {
            fac.credits -= item.costCI;
        }

        const newAsset = {
            id: "ast_" + Date.now(),
            templateId: item.id,
            name: `${item.name} #${this.state.assets.length + 1}`,
            category: item.category,
            location: fac.location,
            facilityId: fac.id,
            hp: item.hpMax,
            hpMax: item.hpMax,
            maintCI: Math.round(item.costCI * 0.015),
            status: "Ativo"
        };

        this.state.assets.push(newAsset);
        sfx.playSuccess();
        this.log(`NOVO ATIVO ADQUIRIDO: [${newAsset.name}] adicionado a [${fac.name}].`, "SUCCESS");
        this.closeCatalogModal();
        this.saveStorage();
        this.renderAll();
    }

    editFacility(facId) {
        const f = this.state.facilities[facId];
        this.currentSelectedFacility = facId;
        document.getElementById("modal-fac-title").innerText = `GERENCIAR: ${f.name.toUpperCase()}`;
        document.getElementById("fac-edit-ci").value = f.credits;
        document.getElementById("fac-edit-fc").value = f.faccreds;
        document.getElementById("fac-edit-labor-ci").value = f.laborCostCI;
        document.getElementById("fac-edit-maint-fc").value = f.maintCostFC;
        document.getElementById("fac-edit-income-ci").value = f.incomeCI;

        document.getElementById("modal-facility-edit").classList.add("show");
    }

    closeFacilityModal() {
        document.getElementById("modal-facility-edit").classList.remove("show");
    }

    saveFacilityEdit() {
        const f = this.state.facilities[this.currentSelectedFacility];
        f.credits = parseInt(document.getElementById("fac-edit-ci").value) || 0;
        f.faccreds = parseInt(document.getElementById("fac-edit-fc").value) || 0;
        f.laborCostCI = parseInt(document.getElementById("fac-edit-labor-ci").value) || 0;
        f.maintCostFC = parseInt(document.getElementById("fac-edit-maint-fc").value) || 0;
        f.incomeCI = parseInt(document.getElementById("fac-edit-income-ci").value) || 0;

        sfx.playSuccess();
        this.log(`PARÂMETROS ATUALIZADOS: Instalação [${f.name}] reconfigurada.`, "INFO");
        this.closeFacilityModal();
        this.saveStorage();
        this.renderAll();
    }

    selectFacility(facId) {
        this.editFacility(facId);
    }

    log(message, type = "INFO") {
        const now = new Date();
        const timeStr = now.toTimeString().split(" ")[0];
        this.state.logs.unshift({
            time: timeStr,
            tag: type,
            msg: message
        });
        if (this.state.logs.length > 80) this.state.logs.pop();
        this.renderLogs();
    }

    renderLogs() {
        const container = document.getElementById("log-container");
        if (!container) return;
        container.innerHTML = this.state.logs.map(l => {
            return `
                <div class="log-entry">
                    <span class="log-time">[${l.time}]</span>
                    <span class="log-tag ${l.tag}">[${l.tag}]</span>
                    <span class="log-msg">${l.msg}</span>
                </div>
            `;
        }).join("");
    }
}

const app = new MacroTerminalApp();
document.addEventListener("DOMContentLoaded", () => {
    app.init();
});
