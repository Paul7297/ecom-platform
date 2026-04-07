import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';

const CustomButton = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  className = '', 
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  outline = false,
  rounded = true,
  animated = true,
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Button size configurations
  const sizes = {
    sm: { padding: '6px 16px', fontSize: '0.875rem' },
    md: { padding: '8px 24px', fontSize: '1rem' },
    lg: { padding: '12px 32px', fontSize: '1.1rem' }
  };

  // Button variants with different color schemes
  const variants = {
    primary: {
      default: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)'
      }
    },
    secondary: {
      default: {
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(240, 147, 251, 0.4)',
        background: 'linear-gradient(135deg, #e06ee6 0%, #e8455a 100%)'
      }
    },
    success: {
      default: {
        background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(17, 153, 142, 0.4)',
        background: 'linear-gradient(135deg, #0e7e74 0%, #2bc86a 100%)'
      }
    },
    danger: {
      default: {
        background: 'linear-gradient(135deg, #eb3349 0%, #f45c43 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(235, 51, 73, 0.4)',
        background: 'linear-gradient(135deg, #d62c41 0%, #e34f37 100%)'
      }
    },
    warning: {
      default: {
        background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
        border: 'none',
        color: '#333'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(247, 151, 30, 0.4)',
        background: 'linear-gradient(135deg, #e08719 0%, #e6c100 100%)'
      }
    },
    dark: {
      default: {
        background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(44, 62, 80, 0.4)',
        background: 'linear-gradient(135deg, #243342 0%, #2980b9 100%)'
      }
    },
    light: {
      default: {
        background: 'white',
        border: '2px solid #e0e0e0',
        color: '#667eea'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        background: '#f8f9fa',
        borderColor: '#667eea'
      }
    },
    outline: {
      default: {
        background: 'transparent',
        border: `2px solid ${outline === 'primary' ? '#667eea' : '#0d6efd'}`,
        color: outline === 'primary' ? '#667eea' : '#0d6efd'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(13, 110, 253, 0.2)',
        background: outline === 'primary' ? '#667eea' : '#0d6efd',
        color: 'white',
        borderColor: 'transparent'
      }
    },
        // Add these to your variants object in CustomButton.js
    login: {
      default: {
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        padding: '8px 20px',
        fontWeight: '500',
        color: '#0d6efd',
        borderColor: '#0d6efd',
        backgroundColor: 'transparent'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(13, 110, 253, 0.3)',
        backgroundColor: '#0d6efd',
        color: 'white'
      }
    },
    signup: {
      default: {
        transition: 'all 0.3s ease',
        borderRadius: '8px',
        padding: '8px 20px',
        fontWeight: '500',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        color: 'white'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
        background: 'linear-gradient(135deg, #5a67d8 0%, #6b46a0 100%)'
      }
    }
  };

  // Get the style based on variant and outline
  let currentStyle = variants[variant] || variants.primary;
  
  if (outline && variant !== 'outline') {
    currentStyle = {
      default: {
        background: 'transparent',
        border: `2px solid ${variant === 'primary' ? '#667eea' : '#0d6efd'}`,
        color: variant === 'primary' ? '#667eea' : '#0d6efd'
      },
      hover: {
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 20px rgba(13, 110, 253, 0.2)',
        background: variant === 'primary' ? '#667eea' : '#0d6efd',
        color: 'white',
        borderColor: 'transparent'
      }
    };
  }

  const buttonStyle = {
    ...sizes[size],
    borderRadius: rounded ? '50px' : '8px',
    transition: animated ? 'all 0.3s ease' : 'none',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    ...(isHovered && !disabled && !loading ? currentStyle.hover : currentStyle.default)
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  // Render icon
  const renderIcon = () => {
    if (!icon) return null;
    
    if (typeof icon === 'string') {
      return <span className="button-icon">{icon}</span>;
    }
    
    return icon;
  };

  return (
    <Button
      onClick={handleClick}
      className={`custom-button ${className} ${animated ? 'animated-button' : ''}`}
      style={buttonStyle}
      onMouseEnter={() => !disabled && !loading && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="me-2"
        />
      )}
      {!loading && icon && iconPosition === 'left' && renderIcon()}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && renderIcon()}
    </Button>
  );
};

export default CustomButton;