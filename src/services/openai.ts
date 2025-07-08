import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Vite.js
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
});

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface FinancialContext {
  budget?: {
    income: number;
    expenses: number;
    leftover: number;
  };
  goals?: Array<{
    name: string;
    targetAmount: number;
    currentAmount: number;
    deadline: string;
  }>;
  reminders?: Array<{
    title: string;
    dueDate: string;
    status: string;
  }>;
}

export class OpenAIService {
  private systemPrompt = `You are Hela AI, a friendly and knowledgeable financial assistant specifically designed for users in Kenya and Africa. You help with:

1. Personal budgeting and expense tracking
2. Savings goals and financial planning
3. Investment advice suitable for the Kenyan market
4. Bill reminders and financial organization
5. Money-saving tips relevant to Kenya/Africa

Key guidelines:
- Always use Kenyan Shillings (Ksh) for currency
- Provide practical advice relevant to the Kenyan context
- Be encouraging and supportive
- Keep responses concise but helpful
- Suggest actionable steps
- Reference local financial institutions, services, and opportunities when relevant
- Be aware of common Kenyan financial challenges and opportunities

You should be conversational, helpful, and focused on empowering users to take control of their financial lives.`;

  private handleOpenAIError(error: any): string {
    console.error('OpenAI API Error:', error);
    
    // Check for specific error types
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('429')) {
      return 'quota_exceeded';
    }
    
    if (error?.status === 401 || error?.message?.includes('401') || error?.message?.includes('authentication')) {
      return 'auth_error';
    }
    
    if (error?.status >= 500 || error?.message?.includes('server')) {
      return 'server_error';
    }
    
    return 'general_error';
  }

  async getChatResponse(
    messages: ChatMessage[],
    context?: FinancialContext
  ): Promise<string> {
    try {
      // Build context-aware system message
      let contextualPrompt = this.systemPrompt;
      
      if (context) {
        contextualPrompt += '\n\nCurrent user financial context:\n';
        
        if (context.budget) {
          contextualPrompt += `Budget: Income Ksh ${context.budget.income.toLocaleString()}, Expenses Ksh ${context.budget.expenses.toLocaleString()}, Leftover Ksh ${context.budget.leftover.toLocaleString()}\n`;
        }
        
        if (context.goals && context.goals.length > 0) {
          contextualPrompt += `Active Goals: ${context.goals.map(g => 
            `${g.name} (Ksh ${g.currentAmount.toLocaleString()}/${g.targetAmount.toLocaleString()})`
          ).join(', ')}\n`;
        }
        
        if (context.reminders && context.reminders.length > 0) {
          const overdueReminders = context.reminders.filter(r => 
            new Date(r.dueDate) < new Date() && r.status === 'active'
          );
          if (overdueReminders.length > 0) {
            contextualPrompt += `Overdue reminders: ${overdueReminders.map(r => r.title).join(', ')}\n`;
          }
        }
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: contextualPrompt },
          ...messages
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || "I'm sorry, I couldn't process your request right now. Please try again.";
    } catch (error) {
      const errorType = this.handleOpenAIError(error);
      
      // Provide specific fallback responses based on error type
      const userMessage = messages[messages.length - 1]?.content.toLowerCase() || '';
      
      if (errorType === 'quota_exceeded') {
        return "I'm currently experiencing high demand and my AI capabilities are temporarily limited. However, I can still help you with basic financial guidance! What would you like to know about budgeting, saving, or investing in Kenya?";
      }
      
      // Fallback responses for common queries
      if (userMessage.includes('budget')) {
        return "I'd love to help with your budget! While I'm having trouble connecting right now, here's a quick tip: Try the 50/30/20 rule - 50% for needs, 30% for wants, and 20% for savings. What specific budgeting challenge are you facing?";
      }
      
      if (userMessage.includes('save') || userMessage.includes('goal')) {
        return "Saving is a great habit! Even starting with Ksh 500 per month can make a big difference. What are you hoping to save for? I can help you create a realistic savings plan.";
      }
      
      if (userMessage.includes('invest')) {
        return "Investment is key to growing wealth! In Kenya, you might consider starting with government bonds, NSE stocks, or money market funds. What's your risk tolerance and investment timeline?";
      }
      
      return "I'm having trouble connecting right now, but I'm here to help with your financial questions! Try asking about budgeting, saving goals, or investment options in Kenya.";
    }
  }

  async generateFinancialInsight(context: FinancialContext): Promise<string> {
    try {
      const prompt = `Based on this financial data, provide a brief, encouraging insight and one actionable tip:
      
Budget: Income Ksh ${context.budget?.income || 0}, Expenses Ksh ${context.budget?.expenses || 0}, Leftover Ksh ${context.budget?.leftover || 0}
Goals: ${context.goals?.length || 0} active goals
Reminders: ${context.reminders?.filter(r => r.status === 'active').length || 0} active reminders

Keep it under 100 words and focus on one key improvement.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || "Keep up the great work managing your finances! Every step forward counts.";
    } catch (error) {
      const errorType = this.handleOpenAIError(error);
      
      // Enhanced fallback insights based on context
      if (context.budget) {
        const savingsRate = ((context.budget.leftover / context.budget.income) * 100);
        
        if (errorType === 'quota_exceeded') {
          if (savingsRate >= 20) {
            return "🎉 Outstanding! You're saving over 20% of your income - that's excellent financial discipline! Consider exploring investment opportunities like NSE stocks or government bonds to grow your surplus even further.";
          } else if (savingsRate >= 10) {
            return `💪 Great progress! You're saving ${Math.round(savingsRate)}% of your income. To reach the ideal 20%, try reducing one small expense category - even Ksh 1,000 less per month makes a difference!`;
          } else if (savingsRate > 0) {
            return `🌱 Every shilling saved is a step forward! You're currently saving ${Math.round(savingsRate)}% of your income. Start small - try saving just Ksh 500 more each month and gradually increase it.`;
          } else {
            return "💡 Building wealth starts with saving your first shilling! Look at your expenses and identify one area where you can cut back by just Ksh 1,000 this month. Small steps lead to big changes!";
          }
        }
        
        // Regular fallback insights
        if (savingsRate >= 20) {
          return "Excellent! You're saving over 20% of your income. Consider investing some of your surplus for even better returns.";
        } else if (savingsRate >= 10) {
          return "Good progress! You're saving " + Math.round(savingsRate) + "% of your income. Try to gradually increase this to 20%.";
        } else {
          return "Every journey starts with a single step! Focus on reducing one expense category to boost your savings rate.";
        }
      }
      
      // Default fallback when no budget context
      if (errorType === 'quota_exceeded') {
        return "🚀 You're taking control of your finances - that's the most important step! Keep tracking your expenses and stay consistent. Remember, even small improvements compound over time!";
      }
      
      return "You're taking control of your finances - that's the most important step! Keep tracking and stay consistent.";
    }
  }

  async suggestCategory(description: string): Promise<string> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a financial categorization assistant. Given a transaction description, suggest the most appropriate category from: Groceries, Transport, Utilities, Entertainment, Healthcare, Shopping, Dining, Education, Insurance, Salary, Side Income, Investment Returns, Business, Freelance, Rental, Other. Respond with just the category name."
          },
          {
            role: "user",
            content: `Categorize this transaction: "${description}"`
          }
        ],
        max_tokens: 20,
        temperature: 0.3,
      });

      return completion.choices[0]?.message?.content?.trim() || "Other";
    } catch (error) {
      this.handleOpenAIError(error);
      
      // Enhanced fallback categorization logic
      const desc = description.toLowerCase();
      
      // More comprehensive keyword matching
      if (desc.includes('supermarket') || desc.includes('grocery') || desc.includes('food') || desc.includes('tuskys') || desc.includes('carrefour') || desc.includes('naivas')) return 'Groceries';
      if (desc.includes('uber') || desc.includes('taxi') || desc.includes('fuel') || desc.includes('transport') || desc.includes('matatu') || desc.includes('boda')) return 'Transport';
      if (desc.includes('electricity') || desc.includes('water') || desc.includes('internet') || desc.includes('bill') || desc.includes('kplc') || desc.includes('safaricom')) return 'Utilities';
      if (desc.includes('movie') || desc.includes('cinema') || desc.includes('entertainment') || desc.includes('netflix') || desc.includes('spotify')) return 'Entertainment';
      if (desc.includes('hospital') || desc.includes('doctor') || desc.includes('medical') || desc.includes('pharmacy') || desc.includes('clinic')) return 'Healthcare';
      if (desc.includes('salary') || desc.includes('pay') || desc.includes('wage') || desc.includes('income')) return 'Salary';
      if (desc.includes('freelance') || desc.includes('side') || desc.includes('gig') || desc.includes('hustle')) return 'Side Income';
      if (desc.includes('school') || desc.includes('university') || desc.includes('course') || desc.includes('education') || desc.includes('tuition')) return 'Education';
      if (desc.includes('insurance') || desc.includes('cover') || desc.includes('policy')) return 'Insurance';
      if (desc.includes('restaurant') || desc.includes('cafe') || desc.includes('dining') || desc.includes('kfc') || desc.includes('pizza')) return 'Dining';
      if (desc.includes('shop') || desc.includes('store') || desc.includes('mall') || desc.includes('buy')) return 'Shopping';
      
      return 'Other';
    }
  }
}

export const openAIService = new OpenAIService();