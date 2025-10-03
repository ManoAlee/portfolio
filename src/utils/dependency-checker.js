/**
 * Dependency Checker
 * Verifica se todas as dependências necessárias estão carregadas
 */

class DependencyChecker {
    constructor() {
        this.requiredGlobals = [
            'portfolioConfig',
            'ThemeManager',
            'NavigationManager'
        ];
        this.optionalGlobals = [
            'initPerformanceMonitoring',
            'ModuleLoader'
        ];
        this.checkDelay = 100; // ms
        this.maxRetries = 50; // 5 segundos no total
    }

    /**
     * Verifica se uma função ou objeto existe no contexto global
     */
    checkGlobal(name) {
        return typeof window[name] !== 'undefined';
    }

    /**
     * Espera por uma dependência com timeout
     */
    async waitForDependency(name, maxRetries = this.maxRetries) {
        return new Promise((resolve, reject) => {
            let retries = 0;

            const checkInterval = setInterval(() => {
                if (this.checkGlobal(name)) {
                    clearInterval(checkInterval);
                    resolve(true);
                } else if (retries >= maxRetries) {
                    clearInterval(checkInterval);
                    reject(new Error(`Dependency '${name}' not found after ${maxRetries * this.checkDelay}ms`));
                }
                retries++;
            }, this.checkDelay);
        });
    }

    /**
     * Verifica todas as dependências necessárias
     */
    async checkAllDependencies() {
        console.log('🔍 Verificando dependências...');
        
        const results = {
            required: {},
            optional: {},
            missing: [],
            available: []
        };

        // Verificar dependências obrigatórias
        for (const dep of this.requiredGlobals) {
            try {
                await this.waitForDependency(dep);
                results.required[dep] = true;
                results.available.push(dep);
                console.log(`✅ ${dep} - Disponível`);
            } catch (error) {
                results.required[dep] = false;
                results.missing.push(dep);
                console.error(`❌ ${dep} - Não encontrado`);
            }
        }

        // Verificar dependências opcionais
        for (const dep of this.optionalGlobals) {
            if (this.checkGlobal(dep)) {
                results.optional[dep] = true;
                results.available.push(dep);
                console.log(`✅ ${dep} - Disponível (opcional)`);
            } else {
                results.optional[dep] = false;
                console.warn(`⚠️ ${dep} - Não disponível (opcional)`);
            }
        }

        return results;
    }

    /**
     * Executa callback quando todas as dependências estiverem prontas
     */
    async whenReady(callback, requiredOnly = false) {
        try {
            const results = await this.checkAllDependencies();
            
            const hasAllRequired = Object.values(results.required).every(available => available);
            
            if (hasAllRequired) {
                console.log('🚀 Todas as dependências necessárias estão disponíveis');
                callback(results);
            } else {
                console.error('❌ Dependências obrigatórias não encontradas:', results.missing);
                throw new Error(`Missing required dependencies: ${results.missing.join(', ')}`);
            }
        } catch (error) {
            console.error('💥 Erro ao verificar dependências:', error);
            throw error;
        }
    }

    /**
     * Executa função com fallback se dependência não estiver disponível
     */
    safeExecute(functionName, fallback = null, ...args) {
        if (this.checkGlobal(functionName)) {
            try {
                return window[functionName](...args);
            } catch (error) {
                console.error(`Erro ao executar ${functionName}:`, error);
                if (fallback) return fallback();
                return null;
            }
        } else {
            console.warn(`Função ${functionName} não disponível`);
            if (fallback) return fallback();
            return null;
        }
    }
}

// Criar instância global
window.dependencyChecker = new DependencyChecker();

// Helper para execução segura
window.safeInit = (functionName, fallback = null) => {
    return window.dependencyChecker.safeExecute(functionName, fallback);
};