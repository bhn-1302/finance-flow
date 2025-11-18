export const getBotReply = (userText: string) => {
    const text = userText.toLowerCase()

    if(text.includes('delivery') || text.includes('comida') || text.includes('restaurante')) {
        return "Notei que você mencionou gastos com comida. Que tal planejar refeições semanais para reduzir custos? Posso te ajudar a montar um plano.";
    }

    if (text.includes('salário') || text.includes('recebo')) {
        return "Ótimo - vamos priorizar suas metas. Quer dividir seu salário em 50% necessidades, 30% objetivos, 20% diversão (exemplo)? Posso ajustar com você.";
    }

    if (text.includes('dívida') || text.includes('empréstimo') || text.includes('parcelas')) {
        return "Dívidas podem ser pesadas. Uma tática útil é priorizar a de maior juros primeiro (avalanche) ou a menor (bola de neve). Quer calcular um plano rápido?";
    }

    return "Interessante! Me conte mais: qual seu maior desafio financeiro agora? (por exemplo: economizar, pagar dívidas, investir...)";
}