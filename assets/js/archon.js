// ARCHON v5.0 - Sistema de Análise Holística Evolutiva
class ArchonAnalyzer {
    constructor() {
        this.analysisHistory = [];
        this.knowledgeBase = new Map();
        this.patterns = new Map();
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadPatterns();
        this.initializeKnowledgeBase();
    }

    bindEvents() {
        const executeBtn = document.getElementById('execute-analysis');
        const commandInput = document.getElementById('archon-command');

        executeBtn.addEventListener('click', () => this.executeAnalysis());
        commandInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeAnalysis();
            }
        });
    }

    loadPatterns() {
        // Padrões de análise auto-replicáveis
        this.patterns.set('observer_filosofico', {
            name: 'Observer Filosófico',
            description: 'Questões recorrentes por domínio',
            template: (domain) => [
                `Qual o propósito fundamental deste ${domain}?`,
                `Como este ${domain} impacta o sistema maior?`,
                `Quais pressupostos estão sendo assumidos?`
            ]
        });

        this.patterns.set('factory_solucoes', {
            name: 'Factory de Soluções',
            description: 'Templates de resolução por categoria',
            categories: ['performance', 'security', 'maintainability', 'scalability']
        });

        this.patterns.set('strategy_evolutivo', {
            name: 'Strategy Evolutivo',
            description: 'Abordagens adaptativas por contexto'
        });
    }

    initializeKnowledgeBase() {
        // Base de conhecimento técnico-filosófico
        this.knowledgeBase.set('technical_patterns', {
            'anti_patterns': [
                'God Object', 'Spaghetti Code', 'Magic Numbers',
                'Tight Coupling', 'Circular Dependencies'
            ],
            'design_patterns': [
                'Observer', 'Factory', 'Strategy', 'Decorator',
                'Adapter', 'Command', 'State', 'Template Method'
            ],
            'architectural_patterns': [
                'MVC', 'MVP', 'MVVM', 'Clean Architecture',
                'Hexagonal', 'Event Sourcing', 'CQRS'
            ]
        });

        this.knowledgeBase.set('philosophical_frameworks', {
            'socratic_questions': [
                'Por que isso existe?',
                'Como sabemos que está correto?',
                'Quais são as implicações?',
                'O que pode dar errado?'
            ],
            'aristotelian_causes': [
                'Causa Material: De que é feito?',
                'Causa Formal: Qual a estrutura?',
                'Causa Eficiente: Como foi criado?',
                'Causa Final: Para que serve?'
            ]
        });
    }

    async executeAnalysis() {
        const command = document.getElementById('archon-command').value.trim();
        const mode = document.getElementById('analysis-mode').value;
        const domain = document.getElementById('domain-focus').value;

        if (!command) {
            this.showError('Por favor, insira um comando de análise.');
            return;
        }

        this.showLoading();
        
        try {
            const analysis = await this.performHolisticAnalysis(command, mode, domain);
            this.displayAnalysis(analysis);
            this.saveToHistory(command, analysis);
        } catch (error) {
            this.showError('Erro durante a análise: ' + error.message);
        }
    }

    async performHolisticAnalysis(command, mode, domain) {
        // Simulação de análise holística
        await this.delay(2000);

        const analysis = {
            timestamp: new Date(),
            command,
            mode,
            domain,
            context: this.extractContext(command),
            layers: {
                technical: this.analyzeTechnicalLayer(command, domain),
                professional: this.analyzeProfessionalLayer(command, domain),
                philosophical: this.analyzePhilosophicalLayer(command, domain)
            },
            insights: this.generateConnectiveInsights(command, domain),
            roadmap: this.generateEvolutionRoadmap(command, domain),
            metrics: this.generateMetrics(command, domain)
        };

        // Auto-replicação: aprender com a análise
        this.learnFromAnalysis(analysis);

        return analysis;
    }

    extractContext(command) {
        const keywords = command.toLowerCase().split(' ');
        const context = {
            system_type: 'unknown',
            focus_area: 'general',
            complexity: 'medium'
        };

        // Sistema
        if (keywords.some(k => ['roi', 'calculadora', 'investimento'].includes(k))) {
            context.system_type = 'financial_calculator';
        } else if (keywords.some(k => ['trafego', 'monitoramento', 'tempo-real'].includes(k))) {
            context.system_type = 'monitoring_system';
        } else if (keywords.some(k => ['automacao', 'python', 'dados'].includes(k))) {
            context.system_type = 'automation_system';
        }

        // Foco
        if (keywords.some(k => ['performance', 'otimizacao'].includes(k))) {
            context.focus_area = 'performance';
        } else if (keywords.some(k => ['seguranca', 'security'].includes(k))) {
            context.focus_area = 'security';
        } else if (keywords.some(k => ['arquitetura', 'design'].includes(k))) {
            context.focus_area = 'architecture';
        }

        return context;
    }

    analyzeTechnicalLayer(command, domain) {
        const context = this.extractContext(command);
        
        return {
            cloud_infrastructure: this.analyzeCloudInfrastructure(context),
            security_devsecops: this.analyzeSecurityDevSecOps(context),
            data_ml: this.analyzeDataML(context),
            frontend_ux: this.analyzeFrontendUX(context),
            apis_integration: this.analyzeAPIsIntegration(context)
        };
    }

    analyzeCloudInfrastructure(context) {
        return {
            current_state: "Aplicação web estática servida via HTTP",
            recommendations: [
                "Implementar HTTPS com certificados SSL/TLS",
                "Considerar CDN para assets estáticos",
                "Configurar compressão GZIP",
                "Implementar cache headers apropriados"
            ],
            modernization_path: [
                "Migração para arquitetura serverless",
                "Implementação de CI/CD pipeline",
                "Containerização com Docker"
            ]
        };
    }

    analyzeSecurityDevSecOps(context) {
        return {
            current_vulnerabilities: [
                "Dados sensíveis em código JavaScript (APIs)",
                "Ausência de Content Security Policy",
                "Falta de sanitização de inputs"
            ],
            security_recommendations: [
                "Implementar CSP headers",
                "Validação e sanitização de todos os inputs",
                "Migrar chaves de API para backend seguro",
                "Implementar rate limiting"
            ],
            devsecops_practices: [
                "SAST scan em PRs",
                "Dependency vulnerability scanning",
                "Secret scanning em commits"
            ]
        };
    }

    analyzeDataML(context) {
        return {
            data_architecture: "Dados processados no frontend sem persistência",
            ml_opportunities: [
                "Predição de tendências de investimento",
                "Análise preditiva de padrões de tráfego",
                "Recomendações personalizadas baseadas em histórico"
            ],
            data_governance: [
                "Implementar política de retenção de dados",
                "Documentar lineage de dados",
                "Estabelecer data quality metrics"
            ]
        };
    }

    analyzeFrontendUX(context) {
        return {
            performance_metrics: {
                lighthouse_score: "Estimado: 85/100",
                core_web_vitals: "Melhorar LCP e CLS",
                bundle_size: "Otimizar carregamento de bibliotecas"
            },
            ux_improvements: [
                "Implementar Progressive Web App",
                "Melhorar acessibilidade (WCAG 2.1)",
                "Adicionar modo offline básico",
                "Otimizar para dispositivos móveis"
            ],
            design_system: [
                "Criar biblioteca de componentes reutilizáveis",
                "Documentar padrões de design",
                "Implementar design tokens"
            ]
        };
    }

    analyzeAPIsIntegration(context) {
        return {
            current_apis: "HG Brasil Finance API (REST)",
            integration_improvements: [
                "Implementar retry logic com exponential backoff",
                "Adicionar circuit breaker pattern",
                "Cache de respostas com TTL apropriado",
                "Fallback para dados mock em caso de falha"
            ],
            api_design: [
                "Versionamento de API",
                "Rate limiting",
                "Documentação OpenAPI/Swagger",
                "Contract testing"
            ]
        };
    }

    analyzeProfessionalLayer(command, domain) {
        return {
            code_craftsmanship: {
                version_control: "Git com commits descritivos",
                testing: "Necessário implementar testes unitários e E2E",
                code_quality: "Estrutura clara, mas falta documentação inline",
                consistency: "Padrão de codificação estabelecido"
            },
            collaboration: {
                code_review: "Processo não documentado",
                documentation: "README bom, falta documentação técnica detalhada",
                communication: "Projeto individual, considerar abertura para contribuições"
            },
            operations: {
                cicd: "Não implementado - oportunidade de melhoria",
                observability: "Logs básicos no console, sem métricas estruturadas",
                incident_management: "Não aplicável para escala atual"
            }
        };
    }

    analyzePhilosophicalLayer(command, domain) {
        return {
            socratic_investigation: {
                purpose_questions: [
                    "Por que este portfólio existe? → Demonstrar competências técnicas",
                    "Como sabemos que está funcionando? → Métricas de engajamento ausentes",
                    "Qual o impacto real? → Facilitar conexões profissionais"
                ]
            },
            aristotelian_architecture: {
                causa_material: "HTML, CSS, JavaScript, APIs externas",
                causa_formal: "SPA com páginas estáticas e interações dinâmicas",
                causa_eficiente: "Desenvolvimento individual com foco em demonstração",
                causa_final: "Apresentar competências e atrair oportunidades profissionais"
            },
            ethical_technology: {
                social_impact: "Positivo - educação e transparência técnica",
                privacy: "Baixo risco - dados não sensíveis",
                sustainability: "Baixo consumo energético por ser estático",
                responsibility: "Código aberto promove aprendizado colaborativo"
            },
            continuous_evolution: {
                kaizen_technical: "Iterações incrementais visíveis no Git",
                feedback_loops: "Implementar analytics para entender uso",
                antifragility: "Sistema simples e resiliente a falhas"
            }
        };
    }

    generateConnectiveInsights(command, domain) {
        return {
            cross_layer_connections: [
                "Implementação técnica de HTTPS conecta-se com ética de privacidade",
                "Qualidade de código impacta diretamente na manutenibilidade filosófica",
                "Observabilidade técnica permite kaizen baseado em dados reais"
            ],
            leverage_points: [
                "Implementar CI/CD como catalisador de qualidade",
                "Analytics como ponte entre técnico e filosófico",
                "Documentação como facilitador de colaboração"
            ],
            hidden_tensions: [
                "Simplicidade atual vs necessidades futuras de escala",
                "Demonstração individual vs abertura para colaboração",
                "Performance vs funcionalidades ricas"
            ]
        };
    }

    generateEvolutionRoadmap(command, domain) {
        return {
            tier1_fundamental: [
                {
                    title: "Implementar Pipeline CI/CD",
                    description: "Automatizar deploy e testes",
                    impact: "Alto",
                    effort: "Médio",
                    timeline: "2-3 semanas"
                },
                {
                    title: "Migrar APIs para Backend Seguro",
                    description: "Proteger chaves e implementar rate limiting",
                    impact: "Alto", 
                    effort: "Alto",
                    timeline: "4-6 semanas"
                }
            ],
            tier2_incremental: [
                {
                    title: "Implementar Testes Automatizados",
                    description: "Unit tests, integration tests, E2E",
                    impact: "Médio",
                    effort: "Médio",
                    timeline: "3-4 semanas"
                },
                {
                    title: "Otimizar Performance",
                    description: "Bundle optimization, lazy loading, PWA",
                    impact: "Médio",
                    effort: "Baixo",
                    timeline: "1-2 semanas"
                }
            ],
            tier3_exploratory: [
                {
                    title: "Implementar ML para Predições",
                    description: "Modelos preditivos para análises",
                    impact: "Baixo",
                    effort: "Alto",
                    timeline: "8-12 semanas"
                },
                {
                    title: "Sistema de Analytics Avançado",
                    description: "Métricas de engajamento e uso",
                    impact: "Baixo",
                    effort: "Médio",
                    timeline: "2-3 semanas"
                }
            ]
        };
    }

    generateMetrics(command, domain) {
        return {
            technical_kpis: {
                performance: {
                    lighthouse_score: 85,
                    page_load_time: "2.3s",
                    bundle_size: "156KB"
                },
                reliability: {
                    uptime: "99.9%",
                    error_rate: "< 0.1%",
                    mttr: "N/A"
                }
            },
            human_kpis: {
                code_quality: {
                    readability_score: 8.5,
                    documentation_coverage: "60%",
                    test_coverage: "0%"
                },
                collaboration: {
                    review_time: "N/A",
                    knowledge_sharing: "Medium (via código público)",
                    team_satisfaction: "N/A (projeto individual)"
                }
            },
            philosophical_kpis: {
                purpose_clarity: 9.0,
                ethical_alignment: 8.5,
                architectural_beauty: 7.5,
                evolution_readiness: 8.0
            }
        };
    }

    learnFromAnalysis(analysis) {
        // Auto-replicação: extrair padrões da análise
        const patterns = this.extractPatterns(analysis);
        patterns.forEach(pattern => {
            this.patterns.set(pattern.id, pattern);
        });

        // Atualizar base de conhecimento
        this.updateKnowledgeBase(analysis);
    }

    extractPatterns(analysis) {
        // Extrair padrões reutilizáveis da análise
        return [
            {
                id: `pattern_${Date.now()}`,
                type: 'analysis_template',
                domain: analysis.domain,
                reusable_insights: analysis.insights.cross_layer_connections,
                success_metrics: analysis.metrics
            }
        ];
    }

    updateKnowledgeBase(analysis) {
        // Atualizar conhecimento com insights da análise atual
        const domainKey = `domain_${analysis.domain}`;
        if (!this.knowledgeBase.has(domainKey)) {
            this.knowledgeBase.set(domainKey, {
                patterns: [],
                insights: [],
                best_practices: []
            });
        }

        const domainData = this.knowledgeBase.get(domainKey);
        domainData.insights.push(...analysis.insights.cross_layer_connections);
        this.knowledgeBase.set(domainKey, domainData);
    }

    displayAnalysis(analysis) {
        const resultsSection = document.getElementById('analysis-results');
        const outputDiv = document.getElementById('analysis-output');

        const html = this.generateAnalysisHTML(analysis);
        outputDiv.innerHTML = html;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    generateAnalysisHTML(analysis) {
        return `
            <div class="analysis-result">
                <div class="analysis-header mb-8 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <h4 class="text-2xl font-bold text-green-400 mb-2">🔬 Análise Concluída</h4>
                            <p class="text-gray-300"><strong>Comando:</strong> ${analysis.command}</p>
                            <p class="text-gray-400 text-sm">Modo: ${analysis.mode} | Domínio: ${analysis.domain} | ${analysis.timestamp.toLocaleString()}</p>
                        </div>
                        <div class="text-right">
                            <div class="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                <i class="fas fa-check-circle"></i>
                                Sistema Analisado
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Diagnóstico Sistêmico -->
                <div class="diagnosis-section mb-8">
                    <h4 class="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <i class="fas fa-microscope text-blue-400"></i>
                        🔬 DIAGNÓSTICO SISTÊMICO
                    </h4>
                    
                    <div class="grid lg:grid-cols-2 gap-6 mb-6">
                        <div class="strengths bg-green-900/20 p-6 rounded-lg border-l-4 border-green-500">
                            <h5 class="text-xl font-semibold text-green-400 mb-4">💪 Forças Identificadas</h5>
                            <div class="space-y-3">
                                <div>
                                    <h6 class="font-medium text-green-300">Técnicas:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Estrutura HTML semântica bem organizada</li>
                                        <li>CSS responsivo com Tailwind</li>
                                        <li>JavaScript modular e bem estruturado</li>
                                    </ul>
                                </div>
                                <div>
                                    <h6 class="font-medium text-green-300">Processuais:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Controle de versão Git organizado</li>
                                        <li>Documentação clara no README</li>
                                        <li>Estrutura de projeto consistente</li>
                                    </ul>
                                </div>
                                <div>
                                    <h6 class="font-medium text-green-300">Filosóficas:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Propósito claro e bem definido</li>
                                        <li>Código aberto promove transparência</li>
                                        <li>Foco em demonstração de competências</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="weaknesses bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                            <h5 class="text-xl font-semibold text-red-400 mb-4">⚠️ Fragilidades Críticas</h5>
                            <div class="space-y-3">
                                <div>
                                    <h6 class="font-medium text-red-300">Código:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Ausência de testes automatizados</li>
                                        <li>Chaves de API expostas no frontend</li>
                                        <li>Falta de tratamento de erros robusto</li>
                                    </ul>
                                </div>
                                <div>
                                    <h6 class="font-medium text-red-300">Arquitetura:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Dependência de APIs externas sem fallback</li>
                                        <li>Ausência de cache estratégico</li>
                                        <li>Falta de observabilidade</li>
                                    </ul>
                                </div>
                                <div>
                                    <h6 class="font-medium text-red-300">Processo:</h6>
                                    <ul class="text-sm text-gray-300 ml-4 list-disc">
                                        <li>Sem pipeline CI/CD</li>
                                        <li>Deploy manual</li>
                                        <li>Falta de métricas de monitoramento</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tensions bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                        <h5 class="text-xl font-semibold text-yellow-400 mb-4">⚡ Tensões Sistêmicas</h5>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${analysis.insights.hidden_tensions.map(tension => `
                                <div class="flex items-start gap-3">
                                    <i class="fas fa-exclamation-triangle text-yellow-400 mt-1"></i>
                                    <span class="text-sm text-gray-300">${tension}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- Catalisadores de Evolução -->
                <div class="evolution-section mb-8">
                    <h4 class="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <i class="fas fa-rocket text-purple-400"></i>
                        ⚡ CATALISADORES DE EVOLUÇÃO
                    </h4>

                    <div class="roadmap-tiers space-y-6">
                        <div class="tier-1 bg-red-900/20 p-6 rounded-lg border-l-4">
                            <h5 class="text-xl font-semibold text-red-400 mb-4">🎯 Tier 1: Mudanças Fundamentais (Alta Alavancagem)</h5>
                            <div class="space-y-4">
                                ${analysis.roadmap.tier1_fundamental.map(item => `
                                    <div class="roadmap-item p-4 bg-gray-800/50 rounded-lg">
                                        <div class="flex justify-between items-start mb-2">
                                            <h6 class="font-semibold text-white">${item.title}</h6>
                                            <div class="flex gap-2">
                                                <span class="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Impacto: ${item.impact}</span>
                                                <span class="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">${item.timeline}</span>
                                            </div>
                                        </div>
                                        <p class="text-sm text-gray-300">${item.description}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="tier-2 bg-yellow-900/20 p-6 rounded-lg border-l-4">
                            <h5 class="text-xl font-semibold text-yellow-400 mb-4">🔧 Tier 2: Melhorias Incrementais</h5>
                            <div class="grid md:grid-cols-2 gap-4">
                                ${analysis.roadmap.tier2_incremental.map(item => `
                                    <div class="roadmap-item p-4 bg-gray-800/50 rounded-lg">
                                        <h6 class="font-semibold text-white mb-1">${item.title}</h6>
                                        <p class="text-sm text-gray-300 mb-2">${item.description}</p>
                                        <div class="flex gap-2">
                                            <span class="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">${item.timeline}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="tier-3 bg-green-900/20 p-6 rounded-lg border-l-4">
                            <h5 class="text-xl font-semibold text-green-400 mb-4">🧪 Tier 3: Experimentos Exploratórios</h5>
                            <div class="grid md:grid-cols-2 gap-4">
                                ${analysis.roadmap.tier3_exploratory.map(item => `
                                    <div class="roadmap-item p-4 bg-gray-800/50 rounded-lg">
                                        <h6 class="font-semibold text-white mb-1">${item.title}</h6>
                                        <p class="text-sm text-gray-300 mb-2">${item.description}</p>
                                        <div class="flex gap-2">
                                            <span class="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">${item.timeline}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Métricas de Evolução -->
                <div class="metrics-section mb-8">
                    <h4 class="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <i class="fas fa-chart-line text-green-400"></i>
                        🎯 MÉTRICAS DE EVOLUÇÃO
                    </h4>
                    
                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="metrics-card bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
                            <h5 class="text-lg font-semibold text-blue-400 mb-4">📊 KPIs Técnicos</h5>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Lighthouse Score:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.technical_kpis.performance.lighthouse_score}/100</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Page Load:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.technical_kpis.performance.page_load_time}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Bundle Size:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.technical_kpis.performance.bundle_size}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Error Rate:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.technical_kpis.reliability.error_rate}</span>
                                </div>
                            </div>
                        </div>

                        <div class="metrics-card bg-green-900/20 p-6 rounded-lg border border-green-500/30">
                            <h5 class="text-lg font-semibold text-green-400 mb-4">👥 KPIs Humanos</h5>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Code Quality:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.human_kpis.code_quality.readability_score}/10</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Documentation:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.human_kpis.code_quality.documentation_coverage}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Test Coverage:</span>
                                    <span class="text-sm font-semibold text-red-400">${analysis.metrics.human_kpis.code_quality.test_coverage}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Knowledge Sharing:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.human_kpis.collaboration.knowledge_sharing}</span>
                                </div>
                            </div>
                        </div>

                        <div class="metrics-card bg-purple-900/20 p-6 rounded-lg border border-purple-500/30">
                            <h5 class="text-lg font-semibold text-purple-400 mb-4">🏛️ KPIs Filosóficos</h5>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Purpose Clarity:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.philosophical_kpis.purpose_clarity}/10</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Ethical Alignment:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.philosophical_kpis.ethical_alignment}/10</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Architectural Beauty:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.philosophical_kpis.architectural_beauty}/10</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-sm text-gray-300">Evolution Readiness:</span>
                                    <span class="text-sm font-semibold">${analysis.metrics.philosophical_kpis.evolution_readiness}/10</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Insights Conectivos -->
                <div class="insights-section">
                    <h4 class="text-2xl font-semibold mb-6 flex items-center gap-3">
                        <i class="fas fa-lightbulb text-yellow-400"></i>
                        💡 INSIGHTS CONECTIVOS
                    </h4>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div class="connections bg-gradient-to-br from-indigo-900/20 to-purple-900/20 p-6 rounded-lg border border-indigo-500/30">
                            <h5 class="text-lg font-semibold text-indigo-400 mb-4">🔗 Conexões Entre Camadas</h5>
                            <ul class="space-y-2">
                                ${analysis.insights.cross_layer_connections.map(connection => `
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-arrow-right text-indigo-400 mt-1 text-xs"></i>
                                        <span class="text-sm text-gray-300">${connection}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>

                        <div class="leverage bg-gradient-to-br from-orange-900/20 to-red-900/20 p-6 rounded-lg border border-orange-500/30">
                            <h5 class="text-lg font-semibold text-orange-400 mb-4">🎯 Pontos de Alavancagem</h5>
                            <ul class="space-y-2">
                                ${analysis.insights.leverage_points.map(point => `
                                    <li class="flex items-start gap-2">
                                        <i class="fas fa-bullseye text-orange-400 mt-1 text-xs"></i>
                                        <span class="text-sm text-gray-300">${point}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    saveToHistory(command, analysis) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date(),
            command,
            analysis,
            summary: this.generateSummary(analysis)
        };

        this.analysisHistory.push(historyItem);
        
        // Manter apenas os últimos 10 itens
        if (this.analysisHistory.length > 10) {
            this.analysisHistory = this.analysisHistory.slice(-10);
        }
    }

    generateSummary(analysis) {
        return {
            total_issues: analysis.layers.technical.security_devsecops.current_vulnerabilities.length,
            priority_recommendations: analysis.roadmap.tier1_fundamental.length,
            overall_score: Math.round((
                analysis.metrics.technical_kpis.performance.lighthouse_score +
                analysis.metrics.human_kpis.code_quality.readability_score * 10 +
                analysis.metrics.philosophical_kpis.purpose_clarity * 10
            ) / 3)
        };
    }

    showLoading() {
        const resultsSection = document.getElementById('analysis-results');
        const outputDiv = document.getElementById('analysis-output');
        
        outputDiv.innerHTML = `
            <div class="loading-analysis text-center py-16">
                <div class="inline-flex items-center gap-4 text-2xl">
                    <i class="fas fa-brain archon-logo animate-pulse"></i>
                    <span class="archon-logo">ARCHON v5.0 Analisando...</span>
                </div>
                <div class="mt-8 max-w-2xl mx-auto">
                    <div class="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div class="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full animate-pulse" style="width: 100%"></div>
                    </div>
                    <p class="text-gray-400 mt-4">Executando análise holística multicamadas...</p>
                </div>
                <div class="mt-8 grid md:grid-cols-3 gap-4 text-sm">
                    <div class="p-4 bg-blue-900/20 rounded-lg">
                        <i class="fas fa-cogs text-blue-400 mb-2"></i>
                        <div>Analisando Camada Técnica</div>
                    </div>
                    <div class="p-4 bg-yellow-900/20 rounded-lg">
                        <i class="fas fa-medal text-yellow-400 mb-2"></i>
                        <div>Avaliando Profissionalismo</div>
                    </div>
                    <div class="p-4 bg-purple-900/20 rounded-lg">
                        <i class="fas fa-university text-purple-400 mb-2"></i>
                        <div>Sintetizando Filosofia</div>
                    </div>
                </div>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    showError(message) {
        const resultsSection = document.getElementById('analysis-results');
        const outputDiv = document.getElementById('analysis-output');
        
        outputDiv.innerHTML = `
            <div class="error-analysis text-center py-16">
                <div class="inline-flex items-center gap-4 text-2xl text-red-400 mb-4">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span>Erro na Análise</span>
                </div>
                <p class="text-gray-300 mb-6">${message}</p>
                <button onclick="document.getElementById('analysis-results').style.display='none'" class="btn btn-primary">
                    Tentar Novamente
                </button>
            </div>
        `;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Inicializar ARCHON quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new ArchonAnalyzer();
});

// Export para uso em outros módulos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArchonAnalyzer;
}