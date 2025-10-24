"""
AI Service Handler with Groq (primary) and Gemini (fallback) integration
Handles content generation, captions, and ad copy for admin panel
"""

import os
from typing import Optional, Dict, Any
import logging
from groq import Groq
import google.generativeai as genai

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.groq_api_key = os.environ.get('GROQ_API_KEY', '')
        self.gemini_api_key = os.environ.get('GEMINI_API_KEY', '')
        
        # Initialize clients
        self.groq_client = None
        self.gemini_model = None
        
        if self.groq_api_key:
            try:
                self.groq_client = Groq(api_key=self.groq_api_key)
                logger.info("Groq client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Groq client: {e}")
        
        if self.gemini_api_key:
            try:
                genai.configure(api_key=self.gemini_api_key)
                self.gemini_model = genai.GenerativeModel('gemini-2.5-pro')
                logger.info("Gemini client initialized successfully")
            except Exception as e:
                logger.error(f"Failed to initialize Gemini client: {e}")
    
    def update_api_keys(self, groq_key: Optional[str] = None, gemini_key: Optional[str] = None):
        """Update API keys dynamically from admin settings"""
        if groq_key:
            self.groq_api_key = groq_key
            try:
                self.groq_client = Groq(api_key=groq_key)
                logger.info("Groq API key updated successfully")
            except Exception as e:
                logger.error(f"Failed to update Groq API key: {e}")
        
        if gemini_key:
            self.gemini_api_key = gemini_key
            try:
                genai.configure(api_key=gemini_key)
                self.gemini_model = genai.GenerativeModel('gemini-2.5-pro')
                logger.info("Gemini API key updated successfully")
            except Exception as e:
                logger.error(f"Failed to update Gemini API key: {e}")
    
    async def generate_text(self, prompt: str, context: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate text using Groq (primary) with Gemini fallback
        Returns: {"success": bool, "text": str, "provider": str, "error": str}
        """
        full_prompt = f"{context}\n\n{prompt}" if context else prompt
        
        # Try Groq first
        if self.groq_client:
            try:
                chat_completion = self.groq_client.chat.completions.create(
                    messages=[
                        {
                            "role": "system",
                            "content": "You are a professional content writer for a photography and videography business. Create engaging, professional content."
                        },
                        {
                            "role": "user",
                            "content": full_prompt
                        }
                    ],
                    model="llama-3.3-70b-versatile",
                    temperature=0.7,
                    max_tokens=1024,
                    top_p=1,
                )
                
                response_text = chat_completion.choices[0].message.content
                logger.info("Successfully generated text using Groq")
                return {
                    "success": True,
                    "text": response_text,
                    "provider": "groq",
                    "error": None
                }
            except Exception as e:
                logger.warning(f"Groq generation failed: {e}. Falling back to Gemini...")
        
        # Fallback to Gemini
        if self.gemini_model:
            try:
                response = self.gemini_model.generate_content(full_prompt)
                logger.info("Successfully generated text using Gemini (fallback)")
                return {
                    "success": True,
                    "text": response.text,
                    "provider": "gemini",
                    "error": None
                }
            except Exception as e:
                logger.error(f"Gemini generation failed: {e}")
                return {
                    "success": False,
                    "text": "",
                    "provider": None,
                    "error": f"Both providers failed. Groq and Gemini errors occurred."
                }
        
        return {
            "success": False,
            "text": "",
            "provider": None,
            "error": "No AI providers configured"
        }
    
    async def generate_caption(self, image_description: str, style: str = "professional") -> Dict[str, Any]:
        """Generate social media captions for images"""
        prompt = f"""Generate a compelling social media caption for a photography post.

Image Description: {image_description}
Style: {style}

Requirements:
- Engaging and professional
- Include relevant photography hashtags
- Keep it concise (2-3 sentences)
- Capture the emotion and essence of the moment

Generate the caption:"""
        
        return await self.generate_text(prompt)
    
    async def generate_ad_copy(self, service: str, target_audience: str, tone: str = "professional") -> Dict[str, Any]:
        """Generate advertisement copy for services"""
        prompt = f"""Create compelling ad copy for a photography service.

Service: {service}
Target Audience: {target_audience}
Tone: {tone}

Requirements:
- Attention-grabbing headline
- Clear value proposition
- Call-to-action
- Keep it concise and persuasive

Generate the ad copy with sections for headline, body, and CTA:"""
        
        return await self.generate_text(prompt)
    
    async def enhance_content(self, original_content: str, enhancement_type: str = "improve") -> Dict[str, Any]:
        """Enhance existing content (rewrite, improve, expand)"""
        prompts = {
            "improve": f"Improve this content while maintaining its core message:\n\n{original_content}",
            "expand": f"Expand this content with more details and engaging information:\n\n{original_content}",
            "rewrite": f"Rewrite this content in a more professional and engaging way:\n\n{original_content}",
            "summarize": f"Create a concise summary of this content:\n\n{original_content}"
        }
        
        prompt = prompts.get(enhancement_type, prompts["improve"])
        return await self.generate_text(prompt)
    
    async def generate_seo_metadata(self, page_title: str, page_content: str) -> Dict[str, Any]:
        """Generate SEO-friendly metadata (title, description, keywords)"""
        prompt = f"""Generate SEO metadata for a photography website page.

Page Title: {page_title}
Page Content: {page_content}

Generate:
1. SEO Title (60 characters max)
2. Meta Description (155 characters max)
3. Keywords (10 relevant keywords, comma-separated)

Format the response clearly with these three sections."""
        
        return await self.generate_text(prompt)

# Global AI service instance
ai_service = AIService()
